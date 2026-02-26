/**
 * Listings / Properties API.
 * - Submit: local Laravel (REACT_APP_FRAUD_API_URL)
 * - List data: live admin API (REACT_APP_PROPERTIES_API_URL) → /api/properties
 */

import axios from 'axios';

const API_BASE = process.env.REACT_APP_FRAUD_API_URL || 'http://127.0.0.1:8000';
// Development: use proxy (same origin) to avoid CORS. Production: use full URL.
const PROPERTIES_API_BASE =
  process.env.NODE_ENV === 'development'
    ? ''
    : (process.env.REACT_APP_PROPERTIES_API_URL || 'https://admin.pakistanproperty.com');
// Admin backend par list/fetch ke liye GET route (configurable – backend jo support kare)
const PROPERTIES_LIST_ENDPOINT = process.env.REACT_APP_PROPERTIES_LIST_ENDPOINT || '/api/properties/list';

/** Normalize item: backend may send property_title/fraud_status etc., we use title/ai_status in UI */
function normalizeProperty(item) {
  if (!item || typeof item !== 'object') return item;
  return {
    ...item,
    title: item.title ?? item.property_title ?? item.name ?? '',
    ai_status: item.ai_status ?? item.fraud_status ?? item.status ?? item.ai_status,
  };
}

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
 * GET /api/listings or GET /api/listings?status=approved|blocked|pending_ai_review|limited_visibility
 * @param {string} [status] - Optional filter by ai_status
 * @returns {Promise<{ data: Array, count: number }>}
 */
export async function getListings(status = null) {
  const params = status ? { status } : {};
  const res = await axios.get(`${API_BASE}/api/listings`, {
    params,
    headers: { Accept: 'application/json' },
    timeout: 15000,
  });
  const body = res.data;
  if (Array.isArray(body)) return { data: body, count: body.length };
  const data = body?.data ?? body?.listings ?? body?.list ?? [];
  const list = Array.isArray(data) ? data : [];
  const count = body?.count ?? list.length;
  return { data: list, count };
}

/**
 * Fetch properties/listings from LIVE admin API.
 * Route .env se: REACT_APP_PROPERTIES_LIST_ENDPOINT (default: /api/properties/list)
 * @param {string} [status] - Optional filter (if API supports ?status=)
 * @returns {Promise<{ data: Array, count: number }>}
 */
export async function getProperties(status = null) {
  const params = status ? { status } : {};
  const path = PROPERTIES_LIST_ENDPOINT.startsWith('/') ? PROPERTIES_LIST_ENDPOINT : `/${PROPERTIES_LIST_ENDPOINT}`;
  const url = PROPERTIES_API_BASE ? `${PROPERTIES_API_BASE}${path}` : path;
  const res = await axios.get(url, {
    params,
    headers: { Accept: 'application/json' },
    timeout: 20000,
  });
  const body = res.data;
  let list;
  if (Array.isArray(body)) {
    list = body.map(normalizeProperty);
  } else {
    const raw = body?.data ?? body?.properties ?? body?.listings ?? body?.list ?? [];
    list = Array.isArray(raw) ? raw.map(normalizeProperty) : [];
  }
  const count = body?.count ?? list.length;
  return { data: list, count };
}
