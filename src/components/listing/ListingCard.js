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
      {risk_reason_json && (() => {
        // API object format: { reasoning, price_analysis, image_analysis }
        if (risk_reason_json && typeof risk_reason_json === 'object' && !Array.isArray(risk_reason_json)) {
          const parts = [];
          if (risk_reason_json.reasoning) parts.push(risk_reason_json.reasoning);
          if (risk_reason_json.price_analysis) parts.push(`Price: ${risk_reason_json.price_analysis}`);
          if (risk_reason_json.image_analysis) parts.push(`Images: ${risk_reason_json.image_analysis}`);
          if (parts.length === 0) return null;
          return (
            <div className="listing-card__risks">
              <span className="listing-card__risks-label">Risk notes:</span>
              <ul className="listing-card__risks-list">
                {parts.map((text, index) => (
                  <li key={index}>{text}</li>
                ))}
              </ul>
            </div>
          );
        }
        // Legacy array format
        if (Array.isArray(risk_reason_json) && risk_reason_json.length > 0) {
          return (
            <div className="listing-card__risks">
              <span className="listing-card__risks-label">Risk notes:</span>
              <ul className="listing-card__risks-list">
                {risk_reason_json.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
          );
        }
        return null;
      })()}
    </article>
  );
}

export default ListingCard;
