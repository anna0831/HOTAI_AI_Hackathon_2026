import type { KnowledgeItem } from '../domain/pack';
import type { SourcePassage } from '../domain/query';
import { localPackStore } from './localPackStore';

export interface RetrievalResult {
  found: boolean;
  answer: string;
  sources: SourcePassage[];
  topScore: number;
}

export interface ILocalRetrieval {
  search(query: string, customItems?: KnowledgeItem[]): RetrievalResult;
}

export class LocalRetrieval implements ILocalRetrieval {
  // Normalize and tokenize Chinese/English mixed text
  private tokenize(text: string): string[] {
    const cleaned = text
      .toLowerCase()
      .replace(/[^\w\s\u4e00-\u9fa5\uac00-\ud7af]/g, ' ')
      .trim();

    const tokens = new Set<string>();

    // 1. Whitespace tokens (for English and spaced words)
    cleaned.split(/\s+/).forEach((t) => {
      if (t.length > 0) tokens.add(t);
    });

    // 2. Character bi-grams & tri-grams for CJK text (for high-precision substring matching)
    const cjkChars = cleaned.replace(/[^\u4e00-\u9fa5\uac00-\ud7af]/g, '');
    for (let i = 0; i < cjkChars.length - 1; i++) {
      tokens.add(cjkChars.slice(i, i + 2));
      if (i + 3 <= cjkChars.length) {
        tokens.add(cjkChars.slice(i, i + 3));
      }
    }

    return Array.from(tokens);
  }

  search(query: string, customItems?: KnowledgeItem[]): RetrievalResult {
    const items = customItems || localPackStore.getKnowledgeItems();
    if (!items || items.length === 0) {
      return {
        found: false,
        answer: '目前尚未下載離線旅程守護包，請先在「旅程包下載」頁面儲存至本機。',
        sources: [],
        topScore: 0,
      };
    }

    const queryTokens = this.tokenize(query);
    if (queryTokens.length === 0) {
      return {
        found: false,
        answer: '請輸入具體的查詢問題。',
        sources: [],
        topScore: 0,
      };
    }

    // Score each item based on BM25-like token matches with field weights
    const scoredItems = items.map((item) => {
      let score = 0;
      const titleLower = item.title.toLowerCase();
      const contentLower = item.content.toLowerCase();
      const keywordsLower = item.keywords.map((k) => k.toLowerCase());

      for (const token of queryTokens) {
        // Direct query exact match bonus
        if (query.includes(token)) {
          // Keyword field match (Weight: 3.5)
          const inKeywords = keywordsLower.some((k) => k.includes(token) || token.includes(k));
          if (inKeywords) score += 3.5;

          // Title field match (Weight: 3.0)
          if (titleLower.includes(token)) score += 3.0;

          // Content field match (Weight: 1.0)
          if (contentLower.includes(token)) score += 1.0;
        }
      }

      // Exact phrase match boosters
      if (titleLower.includes(query.toLowerCase())) score += 10.0;
      for (const kw of keywordsLower) {
        if (query.toLowerCase().includes(kw)) score += 5.0;
      }

      return {
        item,
        score,
      };
    });

    // Sort by score descending
    scoredItems.sort((a, b) => b.score - a.score);

    const topItem = scoredItems[0];
    const MIN_CONFIDENCE_THRESHOLD = 3.0;

    if (!topItem || topItem.score < MIN_CONFIDENCE_THRESHOLD) {
      return {
        found: false,
        answer: `在您下載的首爾 5 日離線旅程守護包中，未找到與「${query}」直接相關的資料。為避免不實資訊，離線狀態下不進行臆測。建議您可於連線後重新查詢或聯絡去趣客服。`,
        sources: [],
        topScore: topItem ? topItem.score : 0,
      };
    }

    // Take top matching passages (up to 3)
    const validMatches = scoredItems
      .filter((s) => s.score >= MIN_CONFIDENCE_THRESHOLD)
      .slice(0, 3);

    const sources: SourcePassage[] = validMatches.map((m) => ({
      id: m.item.id,
      title: m.item.title,
      source_label: m.item.source_label,
      updated_at: m.item.updated_at,
      snippet: m.item.content.slice(0, 90) + '...',
      score: Math.round(m.score * 10) / 10,
    }));

    // Template-based synthesis
    const primary = validMatches[0].item;
    let synthesizedAnswer = `${primary.content}`;

    if (validMatches.length > 1 && validMatches[1].score > 6.0) {
      synthesizedAnswer += `\n\n【補充相關資訊・${validMatches[1].item.title}】：\n${validMatches[1].item.content}`;
    }

    return {
      found: true,
      answer: synthesizedAnswer,
      sources,
      topScore: topItem.score,
    };
  }
}

export const localRetrieval = new LocalRetrieval();
