import React, { useState, useEffect, useCallback } from 'react';
import ListingCard from './ListingCard';
import { getAdminPropertiesPost } from '../../api/listingsApi';

const PER_PAGE = 15;

/**
 * ListingList: pagination + params (property_type_id=1, city_code=PP016) + response display.
 */
function ListingList() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [response, setResponse] = useState(null);

  const fetchListings = useCallback(async (page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAdminPropertiesPost({
        current_page: page,
        per_page: PER_PAGE,
        property_type_id: 1,
        city_code: 'PP016',
      });
      setListings(Array.isArray(result?.data) ? result.data : []);
      setResponse(result);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Failed to load listings.';
      setError(message);
      setListings([]);
      setResponse(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchListings(currentPage);
  }, [currentPage, fetchListings]);

  const lastPage = response?.last_page ?? 1;
  const total = response?.count ?? response?.total ?? 0;

  if (error) {
    return (
      <div className="listing-list listing-list--error" role="alert">
        <p className="listing-list__error-msg">{error}</p>
      </div>
    );
  }

  return (
    <div className="listing-list">
      <div className="listing-list__grid">
        {loading ? (
          <p className="listing-list__empty">Loading...</p>
        ) : listings.length === 0 ? (
          <p className="listing-list__empty">No listings found.</p>
        ) : (
          listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        )}
      </div>

      {response && (
        <>
          <nav className="listing-list__pagination" aria-label="Listings pagination">
            <button
              type="button"
              className="listing-list__page-btn"
              disabled={currentPage <= 1 || loading}
              onClick={() => setCurrentPage((p) => p - 1)}
            >
              Previous
            </button>
            <span className="listing-list__page-info">
              Page {currentPage} of {lastPage}
            </span>
            <button
              type="button"
              className="listing-list__page-btn"
              disabled={currentPage >= lastPage || loading}
              onClick={() => setCurrentPage((p) => p + 1)}
            >
              Next
            </button>
          </nav>

          <div className="listing-list__response">
            <p className="listing-list__api-hint">
              {listings.length} on this page · {total} total from API.
            </p>
            <details className="listing-list__response-details">
              <summary>Response</summary>
              <pre className="listing-list__response-json">
                {JSON.stringify(response.response || response, null, 2)}
              </pre>
            </details>
          </div>
        </>
      )}
    </div>
  );
}

export default ListingList;
