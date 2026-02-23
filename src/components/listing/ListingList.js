import React, { useState, useEffect } from 'react';
import ListingCard from './ListingCard';
import { getListings } from '../../api/listingsApi';

/**
 * ListingList module: fetch and display all listings with AI status and fraud info.
 */
function ListingList() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function fetchListings() {
      setLoading(true);
      setError(null);
      try {
        const data = await getListings();
        if (!cancelled) {
          setListings(Array.isArray(data) ? data : []);
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err.response?.data?.message ||
            err.response?.data?.error ||
            err.message ||
            'Failed to load listings.';
          setError(message);
          setListings([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchListings();
    return () => { cancelled = true; };
  }, []);

  if (loading) {
    return (
      <div className="listing-list listing-list--loading">
        <p>Loading listings...</p>
      </div>
    );
  }

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
        {listings.length === 0 ? (
          <p className="listing-list__empty">No listings found.</p>
        ) : (
          listings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))
        )}
      </div>
    </div>
  );
}

export default ListingList;
