import React from 'react';

/**
 * Action buttons for a fraud review row: View, Approve, Block.
 * Wired to API via parent (approveListing, blockListing).
 */
function FraudActions({ listingId, onView, onApprove, onBlock, disabled = false, loading = false }) {
  const handleView = () => {
    if (typeof onView === 'function') onView(listingId);
  };
  const handleApprove = () => {
    if (typeof onApprove === 'function') onApprove(listingId);
  };
  const handleBlock = () => {
    if (typeof onBlock === 'function') onBlock(listingId);
  };

  return (
    <div className="fraud-actions">
      <button
        type="button"
        className="fraud-actions__btn fraud-actions__btn--view"
        onClick={handleView}
        title="View details"
        disabled={disabled}
      >
        View
      </button>
      <button
        type="button"
        className="fraud-actions__btn fraud-actions__btn--approve"
        onClick={handleApprove}
        title="Approve listing"
        disabled={disabled}
      >
        {loading ? '…' : 'Approve'}
      </button>
      <button
        type="button"
        className="fraud-actions__btn fraud-actions__btn--block"
        onClick={handleBlock}
        title="Block listing"
        disabled={disabled}
      >
        {loading ? '…' : 'Block'}
      </button>
    </div>
  );
}

export default FraudActions;
