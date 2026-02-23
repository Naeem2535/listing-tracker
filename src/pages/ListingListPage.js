import React from 'react';
import ListingList from '../components/listing/ListingList';
import '../styles/ListingList.css';

function ListingListPage() {
  return (
    <div className="listing-list-page">
      <div className="listing-list-page__inner">
        <header className="listing-list-page__header">
          <h1 className="listing-list-page__title">All Listings</h1>
          <p className="listing-list-page__subtitle">
            Pakistan Property – Listings with AI status and fraud information.
          </p>
        </header>
        <ListingList />
      </div>
    </div>
  );
}

export default ListingListPage;
