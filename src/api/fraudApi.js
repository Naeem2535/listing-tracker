/**
 * Fraud API module - Pakistan Property Admin API.
 * Fetches properties from admin.pakistanproperty.com for fraud tracking.
 */

const API_BASE = process.env.REACT_APP_FRAUD_API_URL || 'https://admin.pakistanproperty.com';
const PROPERTIES_URL = `${API_BASE}/api/properties`;

/**
 * Map API property object to fraud list format.
 * Handles different possible field names from Pakistan Property API.
 */
function mapPropertyToFraudItem(item) {
  const id = item.id ?? item.property_id ?? item.listing_id;
  const property_title = item.property_title ?? item.title ?? item.name ?? item.property_name ?? '—';
  const seller_name = item.seller_name ?? item.seller ?? item.user?.name ?? item.owner_name ?? item.user_name ?? '—';
  const city = item.city ?? item.city_name ?? item.location?.city ?? '—';
  const price = item.price ?? item.amount ?? item.list_price ?? 0;
  const fraud_score = item.fraud_score ?? 0;
  const fraud_status = item.fraud_status ?? item.status ?? 'soft_review';

  return {
    id,
    property_title,
    seller_name: typeof seller_name === 'object' ? (seller_name?.name ?? '—') : seller_name,
    city: typeof city === 'object' ? (city?.name ?? '—') : city,
    price: Number(price) || 0,
    fraud_score: Number(fraud_score) || 0,
    fraud_status: String(fraud_status),
  };
}

/**
 * Fetch properties from Pakistan Property API.
 * Used for fraud review list – data is mapped to fraud list format.
 */
export async function getFraudReviewListings() {
  try {
    const res = await fetch(PROPERTIES_URL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      // credentials: 'include',  // uncomment if API uses cookies/session
    });

    if (!res.ok) throw new Error(`API ${res.status}`);

    const json = await res.json();
    const rawList = json.data ?? json.properties ?? json.listings ?? Array.isArray(json) ? json : [];
    const list = Array.isArray(rawList) ? rawList : [];

    const data = list.map(mapPropertyToFraudItem);

    // Module 1: show only soft_review for Fraud Review List page (when backend sends fraud_status)
    const softReview = data.filter((item) => String(item.fraud_status) === 'soft_review');
    const toShow = softReview.length > 0 ? softReview : data;

    return {
      data: toShow,
      total: toShow.length,
    };
  } catch (err) {
    console.warn('Pakistan Property API failed:', err.message);
    return { data: [], total: 0 };
  }
}
