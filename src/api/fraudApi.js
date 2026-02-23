/**
 * Fraud API module - Laravel API integration.
 * Returns only API data; no dummy/fallback data.
 */

const API_BASE = process.env.REACT_APP_FRAUD_API_URL || '';

/**
 * Fetch fraud review listings from Laravel API.
 * Returns empty array when API is not configured or request fails.
 */
export async function getFraudReviewListings() {
  if (!API_BASE) {
    return { data: [], total: 0 };
  }

  try {
    const res = await fetch(`${API_BASE}/api/fraud/soft-review`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const json = await res.json();
    const data = json.data ?? json.listings ?? [];
    return {
      data,
      total: json.total ?? data.length,
    };
  } catch (err) {
    console.warn('Fraud API failed:', err.message);
    return { data: [], total: 0 };
  }
}
