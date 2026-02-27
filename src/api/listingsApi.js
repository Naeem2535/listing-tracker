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
// Admin backend: user properties list – POST /api/properties (Laravel properties() method)
const PROPERTIES_POST_URL = (PROPERTIES_API_BASE || '') + '/api/properties';

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
 * Approve a listing (Fraud Review). PATCH /api/listings/:id
 */
export async function approveListing(id) {
  const res = await axios.patch(`${API_BASE}/api/listings/${id}`, { ai_status: 'approved' }, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    timeout: 15000,
  });
  return res.data;
}

/**
 * Block a listing (Fraud Review). PATCH /api/listings/:id
 */
export async function blockListing(id) {
  const res = await axios.patch(`${API_BASE}/api/listings/${id}`, { ai_status: 'blocked' }, {
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    timeout: 15000,
  });
  return res.data;
}

/**
 * Fetch user properties from admin – GET ya POST /api/properties.
 * property_type_id=1 & city_code=PP016 (query/body dono mein bhejte hain).
 * Pehle GET try (query params), phir same params POST se (agar backend POST expect kare).
 */
export async function getAdminPropertiesPost(params = {}) {
  const query = {
    current_page: params.current_page ?? params.page ?? 1,
    per_page: params.per_page ?? 15,
    status: 'active',
    property_type_id: params.property_type_id ?? 1,
    sub_category_id: params.sub_category_id ?? '',
    category_id: params.category_id ?? '',
    trend: params.trend ?? false,
    new_properties: params.new_properties ?? false,
    ...(params.city_code && { city_code: params.city_code }),
    ...(params.agency_name && { agency_name: params.agency_name }),
    ...(params.location_id && { location_id: params.location_id }),
    ...(params.min_price != null && { min_price: params.min_price }),
    ...(params.max_price != null && { max_price: params.max_price }),
    ...(params.area_min != null && { area_min: params.area_min }),
    ...(params.area_max != null && { area_max: params.area_max }),
  };

  let resBody;
  try {
    const res = await axios.get(PROPERTIES_POST_URL, {
      params: query,
      headers: { Accept: 'application/json' },
      timeout: 20000,
    });
    resBody = res.data;
  } catch (getErr) {
    if (getErr.response?.status === 405 || getErr.response?.status === 404) {
      const res = await axios.post(PROPERTIES_POST_URL, query, {
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        timeout: 20000,
      });
      resBody = res.data;
    } else {
      throw getErr;
    }
  }

  let raw = resBody?.data ?? resBody?.properties ?? resBody?.listings ?? resBody?.list;
  if (!Array.isArray(raw) && raw && typeof raw === 'object' && Array.isArray(raw.data))
    raw = raw.data;
  if (!Array.isArray(raw)) raw = Array.isArray(resBody) ? resBody : [];
  const list = Array.isArray(raw) ? raw.map(normalizeProperty) : [];
  const total = resBody?.total ?? resBody?.count ?? list.length;
  const current_page = resBody?.current_page ?? 1;
  const last_page = resBody?.last_page ?? 1;
  const per_page = resBody?.per_page ?? query.per_page;
  return {
    data: list,
    count: total,
    total,
    current_page,
    last_page,
    per_page,
    response: resBody,
  };
}
