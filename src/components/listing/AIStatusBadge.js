import React from 'react';

/**
 * Displays AI review status as a colored badge.
 * status: "pending_ai_review" | "approved" | "limited_visibility" | "blocked"
 * fraud_score: optional number
 */
function AIStatusBadge({ status, fraud_score }) {
  const config = {
    pending_ai_review: { label: 'Under AI Review', className: 'ai-status-badge ai-status-badge--yellow' },
    approved: { label: 'Approved', className: 'ai-status-badge ai-status-badge--green' },
    limited_visibility: { label: 'Limited Visibility', className: 'ai-status-badge ai-status-badge--orange' },
    blocked: { label: 'Blocked', className: 'ai-status-badge ai-status-badge--red' },
  };

  const { label, className } = config[status] || {
    label: status || 'Unknown',
    className: 'ai-status-badge ai-status-badge--gray',
  };

  return (
    <span className={className} role="status">
      {label}
      {fraud_score != null && (
        <span className="ai-status-badge__score"> (Score: {fraud_score})</span>
      )}
    </span>
  );
}

export default AIStatusBadge;
