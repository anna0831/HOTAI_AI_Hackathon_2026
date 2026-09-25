export type FunnelEventType =
  | 'trip_viewed'
  | 'travel_profile_generated'
  | 'campaign_cta_clicked'
  | 'esim_recommendation_viewed'
  | 'esim_plan_selected'
  | 'pack_build_started'
  | 'pack_downloaded'
  | 'connection_changed'
  | 'query_submitted'
  | 'query_answered'
  | 'query_queued'
  | 'online_refresh_completed'
  | 'travel_card_created'
  | 'share_intent_clicked';

export interface AnalyticsEvent {
  event_id: string;
  type: FunnelEventType;
  timestamp: string;
  properties: Record<string, string | number | boolean | string[] | undefined>;
}

export interface FunnelMetrics {
  campaign_views: number;
  profile_generated: number;
  esim_cta_clicks: number;
  plans_selected: number;
  packs_downloaded: number;
  offline_queries_resolved: number;
  realtime_queries_queued: number;
  shares_created: number;
}
