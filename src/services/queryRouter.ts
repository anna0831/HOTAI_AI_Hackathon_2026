import type { ConnectionState, QueryResult, PendingQuery } from '../domain/query';
import { queryClassifier } from './queryClassifier';
import { localRetrieval } from './localRetrieval';
import { onlineAdapter } from './onlineAdapter';

export interface IQueryRouter {
  route(
    query: string,
    connectionState: ConnectionState,
    onQueuePending?: (pending: PendingQuery) => void
  ): Promise<QueryResult>;
}

export class QueryRouter implements IQueryRouter {
  async route(
    query: string,
    connectionState: ConnectionState,
    onQueuePending?: (pending: PendingQuery) => void
  ): Promise<QueryResult> {
    const startTime = performance.now();
    const classification = queryClassifier.classify(query);
    const queryId = `query-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // RULE 1: Real-time queries
    if (classification.category === 'real_time') {
      if (connectionState === 'offline') {
        // Strict guard: In offline mode, NEVER call external network!
        const pending: PendingQuery = {
          query_id: queryId,
          raw_query: query,
          created_at: new Date().toISOString(),
          reason: classification.reason,
        };

        if (onQueuePending) {
          onQueuePending(pending);
        }

        const latency = Math.round(performance.now() - startTime);

        return {
          query_id: queryId,
          raw_query: query,
          category: 'real_time',
          mode: 'queued',
          answer: `【時效性安全閘道・已排入待連線清單】\n此問題包含即時動態資訊（觸發詞：${classification.detected_triggers.join('、')}）。\n由於目前處於「離線模式 (Offline)」，系統為避免以過期的離線預載資料造成誤導，已安全攔截此問題並保留在待查詢清單中。一旦恢復連線，您可以一鍵點擊取得即時最新動態！`,
          sources: [],
          timestamp: new Date().toISOString(),
          latency_ms: latency,
          confidence: 'high',
          requires_network: true,
          queued: true,
        };
      } else {
        // Online or poor connection: fetch from online adapter
        const liveData = await onlineAdapter.fetchLiveInfo(query);
        const latency = Math.round(performance.now() - startTime);

        return {
          query_id: queryId,
          raw_query: query,
          category: 'real_time',
          mode: 'online_live',
          answer: liveData.answer,
          sources: [liveData.source],
          timestamp: new Date().toISOString(),
          latency_ms: latency,
          confidence: 'high',
          requires_network: true,
        };
      }
    }

    // RULE 2: Personal or Stable queries -> local retrieval
    if (classification.category === 'personal' || classification.category === 'stable') {
      const retrieval = localRetrieval.search(query);
      const latency = Math.round(performance.now() - startTime);

      if (retrieval.found) {
        return {
          query_id: queryId,
          raw_query: query,
          category: classification.category,
          mode: 'offline_local',
          answer: retrieval.answer,
          sources: retrieval.sources,
          timestamp: new Date().toISOString(),
          latency_ms: latency,
          confidence: retrieval.topScore > 10 ? 'high' : 'medium',
          requires_network: false,
        };
      } else {
        return {
          query_id: queryId,
          raw_query: query,
          category: classification.category,
          mode: 'not_found',
          answer: retrieval.answer,
          sources: [],
          timestamp: new Date().toISOString(),
          latency_ms: latency,
          confidence: 'low',
          requires_network: false,
        };
      }
    }

    // RULE 3: Unknown or Out of Scope queries
    const localAttempt = localRetrieval.search(query);
    const latency = Math.round(performance.now() - startTime);

    if (localAttempt.found && localAttempt.topScore >= 5.0) {
      return {
        query_id: queryId,
        raw_query: query,
        category: 'stable',
        mode: 'offline_local',
        answer: localAttempt.answer,
        sources: localAttempt.sources,
        timestamp: new Date().toISOString(),
        latency_ms: latency,
        confidence: 'medium',
        requires_network: false,
      };
    }

    if (connectionState === 'offline') {
      return {
        query_id: queryId,
        raw_query: query,
        category: 'unknown',
        mode: 'not_found',
        answer: `【離線守護包範圍提醒】\n${classification.reason}。\n在離線守護包中找不到與「${query}」直接對應的常備資訊。離線狀態下系統堅持不產生幻覺，建議您連線後向去趣客服諮詢。`,
        sources: [],
        timestamp: new Date().toISOString(),
        latency_ms: latency,
        confidence: 'low',
        requires_network: true,
      };
    } else {
      const liveData = await onlineAdapter.fetchLiveInfo(query);
      return {
        query_id: queryId,
        raw_query: query,
        category: 'unknown',
        mode: 'online_live',
        answer: liveData.answer,
        sources: [liveData.source],
        timestamp: new Date().toISOString(),
        latency_ms: latency,
        confidence: 'medium',
        requires_network: true,
      };
    }
  }
}

export const queryRouter = new QueryRouter();
