import React, { useState } from 'react';
import FraudReviewList from './pages/admin/FraudReviewList';
import FraudDashboardPage from './pages/admin/FraudDashboardPage';
import ListingListPage from './pages/ListingListPage';
import './App.css';

const VIEWS = { listings: 'listings', fraudDashboard: 'fraudDashboard', fraudReview: 'fraudReview' };

function App() {
  const [view, setView] = useState(VIEWS.listings);

  return (
    <div className="App">
      <nav className="app-nav">
        <div className="app-nav__inner">
          <span className="app-nav__brand">Pakistan Property</span>
          <div className="app-nav__links">
            <button
              type="button"
              className={`app-nav__link ${view === VIEWS.listings ? 'app-nav__link--active' : ''}`}
              onClick={() => setView(VIEWS.listings)}
            >
              Listings
            </button>
            <button
              type="button"
              className={`app-nav__link ${view === VIEWS.fraudDashboard ? 'app-nav__link--active' : ''}`}
              onClick={() => setView(VIEWS.fraudDashboard)}
            >
              Fraud Dashboard
            </button>
            <button
              type="button"
              className={`app-nav__link ${view === VIEWS.fraudReview ? 'app-nav__link--active' : ''}`}
              onClick={() => setView(VIEWS.fraudReview)}
            >
              Fraud Review
            </button>
          </div>
        </div>
      </nav>
      <main className="app-main">
        {view === VIEWS.listings && <ListingListPage />}
        {view === VIEWS.fraudDashboard && <FraudDashboardPage />}
        {view === VIEWS.fraudReview && <FraudReviewList />}
      </main>
    </div>
  );
}

export default App;
