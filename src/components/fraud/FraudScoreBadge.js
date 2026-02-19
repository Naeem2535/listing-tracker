import React from 'react';

/**
 * Renders a fraud score with color-coded badge.
 * 0–40 → Green (low risk)
 * 41–70 → Orange (soft review)
 * 71–100 → Red (high risk)
 */
function FraudScoreBadge({ score }) {
  const numScore = Number(score);
  let variant = 'fraud-badge--green';
  if (numScore >= 71) variant = 'fraud-badge--red';
  else if (numScore >= 41) variant = 'fraud-badge--orange';

  return (
    <span className={`fraud-badge fraud-badge--score ${variant}`}>
      {numScore}
    </span>
  );
}

export default FraudScoreBadge;
