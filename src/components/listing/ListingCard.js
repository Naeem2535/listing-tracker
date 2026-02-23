import React from 'react';
import AIStatusBadge from './AIStatusBadge';

/**
 * Single listing card: title, city, price, AI status, fraud score, risk reasons.
 */
function ListingCard({ listing }) {
  const { id, title, city, price, ai_status, fraud_score, risk_reason_json } = listing;

  const formatPrice = (value) => {
    if (value == null || value === '') return '—';
    return new Intl.NumberFormat('en-PK', {
      style: 'decimal',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <article className="listing-card" data-id={id}>
      <h3 className="listing-card__title">{title || 'Untitled'}</h3>
      <div className="listing-card__meta">
        <span className="listing-card__city">{city || '—'}</span>
        <span className="listing-card__price">PKR {formatPrice(price)}</span>
      </div>
      <div className="listing-card__status">
        <AIStatusBadge status={ai_status} fraud_score={fraud_score != null ? fraud_score : undefined} />
      </div>
      {fraud_score != null && (
        <p className="listing-card__score">
          Fraud score: <strong>{fraud_score}</strong>
        </p>
      )}
      {risk_reason_json && Array.isArray(risk_reason_json) && risk_reason_json.length > 0 && (
        <div className="listing-card__risks">
          <span className="listing-card__risks-label">Risk notes:</span>
          <ul className="listing-card__risks-list">
            {risk_reason_json.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}

export default ListingCard;
