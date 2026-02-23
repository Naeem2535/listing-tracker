import React from 'react';

/**
 * Action buttons for a fraud review row: View, Approve, Block.
 * Handlers are optional for UI-only phase.
 */
function FraudActions({ listingId, onView, onApprove, onBlock }) {
  const handleView = () => {
    if (typeof onView === 'function') onView(listingId);
    else console.log('View listing:', listingId);
  };
  const handleApprove = () => {
    if (typeof onApprove === 'function') onApprove(listingId);
    else console.log('Approve listing:', listingId);
  };
  const handleBlock = () => {
    if (typeof onBlock === 'function') onBlock(listingId);
    else console.log('Block listing:', listingId);
  };

  return (
    <div className="fraud-actions">
      <button
        type="button"
        className="fraud-actions__btn fraud-actions__btn--view" 
        onClick={handleView}
        title="View details"
      >
        View
      </button>
      <button
        type="button"
        className="fraud-actions__btn fraud-actions__btn--approve"
        onClick={handleApprove}
        title="Approve listing"
      >
        Approve
      </button>
      <button
        type="button"
        className="fraud-actions__btn fraud-actions__btn--block"
        onClick={handleBlock}
        title="Block listing"
      >
        Block
      </button>
    </div>
  );
}

export default FraudActions;
