/**
 * Listings API - Laravel backend integration.
 * POST /api/listings for listing submission.
 */

import axios from 'axios';

const API_BASE = process.env.REACT_APP_FRAUD_API_URL || 'http://127.0.0.1:8000';

/**
 * Submit a new listing. Backend returns AI status and risk reasons.
 * @param {FormData|Object} payload - Form data or JSON (with images as base64 or multipart)
 * @returns {Promise<{ id, status, fraud_score?, risk_reason_json? }>}
 */
export async function submitListing(payload) {
  const res = await axios.post(`${API_BASE}/api/listings`, payload, {
    headers:
      payload instanceof FormData
        ? { 'Content-Type': 'multipart/form-data', Accept: 'application/json' }
        : { 'Content-Type': 'application/json', Accept: 'application/json' },
    timeout: 60000,
  });
  return res.data;
}

/**
 * Fetch all listings with AI status and fraud info.
 * GET /api/listings
 */
export async function getListings() {
  const res = await axios.get(`${API_BASE}/api/listings`, {
    headers: { Accept: 'application/json' },
    timeout: 15000,
  });
  const body = res.data;
  if (Array.isArray(body)) return body;
  const list = body?.data ?? body?.listings ?? body?.list ?? [];
  return Array.isArray(list) ? list : [];
}
