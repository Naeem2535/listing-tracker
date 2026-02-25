import React, { useState, useEffect, useCallback } from 'react';
import { getListings } from '../../api/listingsApi';
import FraudStatsCards from './FraudStatsCards';
import FraudFilterBar from './FraudFilterBar';
import FraudListingTable from './FraudListingTable';
import FraudDetailModal from './FraudDetailModal';

function computeStats(list) {
  const stats = {
    total: list.length,
    approved: 0,
    pending_ai_review: 0,
    limited_visibility: 0,
    blocked: 0,
  };
  list.forEach((item) => {
    const s = item.ai_status;
    if (s && stats[s] !== undefined) stats[s]++;
  });
  return stats;
}

function FraudDashboard() {
  const [listings, setListings] = useState([]);
  const [allListings, setAllListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedListing, setSelectedListing] = useState(null);

  const fetchData = useCallback(async (status = null) => {
    setLoading(true);
    setError(null);
    try {
      const result = await getListings(status || undefined);
      const data = result?.data ?? [];
      const list = Array.isArray(data) ? data : [];
      setListings(list);
      if (!status) setAllListings(list);
    } catch (err) {
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        'Failed to load listings.';
      setError(message);
      setListings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(selectedStatus || null);
  }, [selectedStatus, fetchData]);

  const handleFilterChange = (value) => {
    setSelectedStatus(value);
  };

  const handleView = (listing) => {
    setSelectedListing(listing);
  };

  const stats = computeStats(allListings);

  if (error) {
    return (
      <div className="fraud-dashboard fraud-dashboard--error" role="alert">
        <p className="fraud-dashboard__error">{error}</p>
      </div>
    );
  }

  return (
    <div className="fraud-dashboard">
      <FraudStatsCards counts={stats} />
      <FraudFilterBar
        value={selectedStatus}
        onChange={handleFilterChange}
        disabled={loading}
      />
      {loading ? (
        <div className="fraud-dashboard__loading">
          <p>Loading listings...</p>
        </div>
      ) : (
        <FraudListingTable listings={listings} onView={handleView} />
      )}
      {selectedListing && (
        <FraudDetailModal
          listing={selectedListing}
          onClose={() => setSelectedListing(null)}
        />
      )}
    </div>
  );
}

export default FraudDashboard;
