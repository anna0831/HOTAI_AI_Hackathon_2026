export interface Traveler {
  name: string;
  party_size: number;
  device: string;
  usage_profile: string[];
}

export interface ItineraryItem {
  id: string;
  time: string;
  title: string;
  category: 'transport' | 'attraction' | 'food' | 'hotel' | 'shopping';
  location: string;
  note?: string;
  tags?: string[];
}

export interface ItineraryDay {
  day: number;
  date: string;
  region: string;
  title: string;
  summary: string;
  offline_pack_focus: string;
  items: ItineraryItem[];
}

export interface Trip {
  trip_id: string;
  destination: string;
  title: string;
  days: number;
  start_date: string;
  end_date: string;
  traveler: Traveler;
  itinerary: ItineraryDay[];
  mock: true;
}

export interface EsimPlan {
  plan_id: string;
  name: string;
  type: 'total' | 'daily' | 'unlimited';
  data_allowance: string;
  duration_days: number;
  price_twd: number;
  original_price_twd: number;
  highlight_badge?: string;
  rules: string[];
  recommended_reason: string;
  features: string[];
  mock: true;
}
