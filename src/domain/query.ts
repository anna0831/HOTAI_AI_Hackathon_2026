export type ConnectionState = 'online' | 'poor_connection' | 'offline';

export type QueryCategory = 'personal' | 'stable' | 'real_time' | 'unknown';

export type AnswerMode = 
  | 'offline_local'  // 已使用離線旅程包
  | 'online_live'     // 已取得最新資訊
  | 'queued'          // 等待連線
  | 'not_found'       // 旅程包中沒有資料
  | 'stale';          // 資料可能已過期

export interface SourcePassage {
  id: string;
  title: string;
  source_label: string;
  updated_at: string;
  snippet: string;
  score: number;
}

export interface QueryClassification {
  category: QueryCategory;
  reason: string;
  detected_triggers: string[];
}

export interface QueryResult {
  query_id: string;
  raw_query: string;
  category: QueryCategory;
  mode: AnswerMode;
  answer: string;
  sources: SourcePassage[];
  timestamp: string;
  latency_ms: number;
  confidence: 'high' | 'medium' | 'low';
  requires_network: boolean;
  queued?: boolean;
}

export interface PendingQuery {
  query_id: string;
  raw_query: string;
  created_at: string;
  reason: string;
}
