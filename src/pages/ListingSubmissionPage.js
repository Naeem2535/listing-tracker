import React from 'react';
import ListingForm from '../components/listing/ListingForm';
import '../styles/ListingSubmission.css';

function ListingSubmissionPage() {
  return (
    <div className="listing-submission-page">
      <div className="listing-submission-page__inner">
        <header className="listing-submission-header">
          <h1 className="listing-submission-header__title">
            Submit Property Listing
          </h1>
          <p className="listing-submission-header__subtitle">
            Pakistan Property – Listing will be reviewed by AI for fraud detection.
          </p>
        </header>
        <ListingForm />
      </div>
    </div>
  );
}

export default ListingSubmissionPage;
