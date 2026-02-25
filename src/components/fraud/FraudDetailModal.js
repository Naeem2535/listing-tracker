import React from 'react';
import AIStatusBadge from '../listing/AIStatusBadge';

function FraudDetailModal({ listing, onClose }) {
  if (!listing) return null;

  const {
    title,
    city,
    price,
    fraud_score,
    ai_status,
    risk_reason_json,
  } = listing;

  const formatPrice = (val) =>
    val != null && val !== ''
      ? new Intl.NumberFormat('en-PK', { maximumFractionDigits: 0 }).format(val)
      : '—';

  return (
    <div className="fraud-modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="fraud-modal-title">
      <div className="fraud-modal" onClick={(e) => e.stopPropagation()}>
        <div className="fraud-modal__header">
          <h2 id="fraud-modal-title" className="fraud-modal__title">Listing Details</h2>
          <button
            type="button"
            className="fraud-modal__close"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className="fraud-modal__body">
          <p className="fraud-modal__row">
            <span className="fraud-modal__label">Title</span>
            <span className="fraud-modal__value">{title || '—'}</span>
          </p>
          <p className="fraud-modal__row">
            <span className="fraud-modal__label">City</span>
            <span className="fraud-modal__value">{city || '—'}</span>
          </p>
          <p className="fraud-modal__row">
            <span className="fraud-modal__label">Price</span>
            <span className="fraud-modal__value">PKR {formatPrice(price)}</span>
          </p>
          <p className="fraud-modal__row">
            <span className="fraud-modal__label">Fraud Score</span>
            <span className="fraud-modal__value">{fraud_score != null ? fraud_score : '—'}</span>
          </p>
          <p className="fraud-modal__row">
            <span className="fraud-modal__label">AI Status</span>
            <span className="fraud-modal__value">
              <AIStatusBadge status={ai_status} fraud_score={fraud_score} />
            </span>
          </p>
          <div className="fraud-modal__row fraud-modal__row--block">
            <span className="fraud-modal__label">Risk Reasons</span>
            {risk_reason_json && Array.isArray(risk_reason_json) && risk_reason_json.length > 0 ? (
              <ul className="fraud-modal__risks">
                {risk_reason_json.map((reason, i) => (
                  <li key={i}>{reason}</li>
                ))}
              </ul>
            ) : (
              <p className="fraud-modal__no-issues">No AI issues detected.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FraudDetailModal;
