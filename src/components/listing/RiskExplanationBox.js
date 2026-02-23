import React from 'react';

/**
 * Displays AI risk reasons in a styled box.
 * risk_reason_json: array of strings
 */
function RiskExplanationBox({ risk_reason_json }) {
  if (!risk_reason_json || !Array.isArray(risk_reason_json) || risk_reason_json.length === 0) {
    return null;
  }

  return (
    <div className="risk-explanation-box">
      <h3 className="risk-explanation-box__title">AI Review Notes</h3>
      <ul className="risk-explanation-box__list">
        {risk_reason_json.map((reason, index) => (
          <li key={index}>{reason}</li>
        ))}
      </ul>
    </div>
  );
}

export default RiskExplanationBox;
