import React from 'react';

const STATS = [
  { key: 'total', label: 'Total Listings', className: 'fraud-stats-card fraud-stats-card--total' },
  { key: 'approved', label: 'Approved', className: 'fraud-stats-card fraud-stats-card--approved' },
  { key: 'pending_ai_review', label: 'Pending Review', className: 'fraud-stats-card fraud-stats-card--pending' },
  { key: 'limited_visibility', label: 'Limited Visibility', className: 'fraud-stats-card fraud-stats-card--limited' },
  { key: 'blocked', label: 'Blocked', className: 'fraud-stats-card fraud-stats-card--blocked' },
];

function FraudStatsCards({ counts = {} }) {
  return (
    <div className="fraud-stats-cards">
      {STATS.map(({ key, label, className }) => (
        <div key={key} className={className}>
          <span className="fraud-stats-card__label">{label}</span>
          <span className="fraud-stats-card__value">{counts[key] ?? 0}</span>
        </div>
      ))}
    </div>
  );
}

export default FraudStatsCards;
