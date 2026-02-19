/**
 * Fraud API module - placeholder for Laravel API integration.
 * Uses static dummy data for Module 1 development.
 */

export const DUMMY_FRAUD_LISTINGS = [
  {
    id: 1001,
    property_title: '3 Bed Luxury Apartment in DHA Phase 5',
    seller_name: 'Ahmed Khan',
    city: 'Karachi',
    price: 45000000,
    fraud_score: 52,
    fraud_status: 'soft_review',
  },
  {
    id: 1002,
    property_title: 'Commercial Plot 200 Sq Yd - Main Boulevard',
    seller_name: 'Sara Real Estate',
    city: 'Lahore',
    price: 28000000,
    fraud_score: 65,
    fraud_status: 'soft_review',
  },
  {
    id: 1003,
    property_title: 'Duplex House with Garden - F-7',
    seller_name: 'Muhammad Ali',
    city: 'Islamabad',
    price: 95000000,
    fraud_score: 48,
    fraud_status: 'soft_review',
  },
  {
    id: 1004,
    property_title: '1 Kanal Farm House - GT Road',
    seller_name: 'Property Hub PK',
    city: 'Lahore',
    price: 120000000,
    fraud_score: 71,
    fraud_status: 'soft_review',
  },
  {
    id: 1005,
    property_title: '2 Bed Apartment Near Sea View',
    seller_name: 'Marina Properties',
    city: 'Karachi',
    price: 18500000,
    fraud_score: 58,
    fraud_status: 'soft_review',
  },
  {
    id: 1006,
    property_title: 'Office Space 1500 Sq Ft - Blue Area',
    seller_name: 'Capital Estates',
    city: 'Islamabad',
    price: 65000000,
    fraud_score: 62,
    fraud_status: 'soft_review',
  },
  {
    id: 1007,
    property_title: 'Residential Plot 10 Marla - Bahria',
    seller_name: 'Ahmed Khan',
    city: 'Rawalpindi',
    price: 22000000,
    fraud_score: 55,
    fraud_status: 'soft_review',
  },
  {
    id: 1008,
    property_title: 'Penthouse with Rooftop - Clifton',
    seller_name: 'Elite Homes',
    city: 'Karachi',
    price: 185000000,
    fraud_score: 68,
    fraud_status: 'soft_review',
  },
  {
    id: 1009,
    property_title: 'Shop 200 Sq Ft - Main Market',
    seller_name: 'Faisal Traders',
    city: 'Faisalabad',
    price: 8500000,
    fraud_score: 45,
    fraud_status: 'soft_review',
  },
  {
    id: 1010,
    property_title: '5 Marla House - Model Town',
    seller_name: 'Lahore Property Co',
    city: 'Lahore',
    price: 32000000,
    fraud_score: 59,
    fraud_status: 'soft_review',
  },
];

/** Laravel API base URL - set in .env as REACT_APP_FRAUD_API_URL or use dummy */
const API_BASE = process.env.REACT_APP_FRAUD_API_URL || '';

/**
 * Fetch fraud review listings from Laravel API.
 * If API_BASE is empty or request fails, returns dummy data for development.
 */
export async function getFraudReviewListings() {
  if (!API_BASE) {
    return Promise.resolve({
      data: DUMMY_FRAUD_LISTINGS,
      total: DUMMY_FRAUD_LISTINGS.length,
    });
  }

  try {
    const res = await fetch(`${API_BASE}/api/fraud/soft-review`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`API ${res.status}`);
    const json = await res.json();
    return {
      data: json.data ?? json.listings ?? [],
      total: json.total ?? (json.data ?? json.listings ?? []).length,
    };
  } catch (err) {
    console.warn('Fraud API failed, using dummy data:', err.message);
    return {
      data: DUMMY_FRAUD_LISTINGS,
      total: DUMMY_FRAUD_LISTINGS.length,
    };
  }
}
