import React from 'react';
import FraudDashboard from '../../components/fraud/FraudDashboard';
import '../../styles/FraudDashboard.css';

function FraudDashboardPage() {
  return (
    <div className="fraud-dashboard-page">
      <div className="fraud-dashboard-page__inner">
        <header className="fraud-dashboard-page__header">
          <h1 className="fraud-dashboard-page__title">AI Fraud Review Dashboard</h1>
          <p className="fraud-dashboard-page__subtitle">
            Pakistan Property Admin – View all listings with AI status, fraud score and risk reasons.
          </p>
        </header>
        <FraudDashboard />
      </div>
    </div>
  );
}

export default FraudDashboardPage;
