import { describe, it, expect } from 'vitest';
import { localRetrieval } from '../services/localRetrieval';
import defaultKnowledge from '../data/knowledge_items.json';
import type { KnowledgeItem } from '../domain/pack';

describe('LocalRetrieval Engine', () => {
  const items = defaultKnowledge.items as unknown as KnowledgeItem[];

  it('1. should resolve airport to hotel transport', () => {
    const res = localRetrieval.search('我要怎麼從仁川機場到弘大的住宿？', items);
    expect(res.found).toBe(true);
    expect(res.answer).toContain('AREX');
    expect(res.answer).toContain('弘大入口站');
  });

  it('2. should resolve hotel address', () => {
    const res = localRetrieval.search('我的住宿地址是什麼？', items);
    expect(res.found).toBe(true);
    expect(res.answer).toContain('弘大舒適文旅');
    expect(res.answer).toContain('楊花路 160 號');
  });

  it('3. should resolve tomorrow itinerary', () => {
    const res = localRetrieval.search('明天行程有哪些景點？', items);
    expect(res.found).toBe(true);
    expect(res.answer).toContain('景福宮');
    expect(res.answer).toContain('北村');
  });

  it('4. should resolve Gyeongbokgung palace history', () => {
    const res = localRetrieval.search('景福宮有什麼歷史？', items);
    expect(res.found).toBe(true);
    expect(res.answer).toContain('1395');
    expect(res.answer).toContain('朝鮮');
  });

  it('5. should resolve Seongsu station exit', () => {
    const res = localRetrieval.search('去聖水洞要在哪一站下車？', items);
    expect(res.found).toBe(true);
    expect(res.answer).toContain('聖水站');
    expect(res.answer).toContain('2 號線');
  });

  it('6. should resolve eSIM troubleshooting steps', () => {
    const res = localRetrieval.search('eSIM 沒有連上要先檢查什麼？', items);
    expect(res.found).toBe(true);
    expect(res.answer).toContain('數據漫遊');
    expect(res.answer).toContain('重新開機');
  });

  it('7. should resolve emergency phone numbers', () => {
    const res = localRetrieval.search('韓國緊急電話是多少？', items);
    expect(res.found).toBe(true);
    expect(res.answer).toContain('112');
    expect(res.answer).toContain('119');
    expect(res.answer).toContain('1330');
  });

  it('8. should resolve Korean bathroom phrase', () => {
    const res = localRetrieval.search('「請問洗手間在哪裡」韓文怎麼說？', items);
    expect(res.found).toBe(true);
    expect(res.answer).toContain('화장실이 어디예요');
  });

  it('should fallback honestly on out-of-scope question without hallucinating', () => {
    const res = localRetrieval.search('幫我買 BTS 演唱會門票', items);
    expect(res.found).toBe(false);
    expect(res.answer).toContain('未找到');
  });
});
