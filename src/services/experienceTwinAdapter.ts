/**
 * Experience Twin Adapter
 *
 * 唯一可替換介面：行前有網路時由此取得備案資料。
 *
 * 目前實作：FixtureAdapter — 回傳靜態 fixture，模擬 200ms 延遲
 * 未來替換：建立 RealExperienceTwinAdapter implements IExperienceTwinAdapter
 *            並在此檔案底部替換 export 的實例，其餘呼叫端無需修改。
 *
 * 絕對不呼叫真實外部 API，不引入 LLM，不新增大型相依套件。
 */

import type { TwinPack } from '../domain/twin';
import { EXPERIENCE_TWIN_FIXTURE } from '../data/experienceTwinFixture';

/**
 * Experience Twin Adapter 介面
 * 後端就緒後，只需實作此介面並替換 export 實例。
 */
export interface IExperienceTwinAdapter {
  /**
   * 依行程 ID 取得體驗雙生備案包
   * @param tripId 行程 ID（如 'seoul-demo-001'）
   * @returns 備案包（含 is_fixture 標記，表示資料來源）
   */
  fetchTwins(tripId: string): Promise<TwinPack>;
}

/**
 * Fixture 實作（Demo 用）
 * 模擬 200ms 網路延遲，實際回傳靜態 fixture 資料，不發任何網路請求。
 */
class ExperienceTwinFixtureAdapter implements IExperienceTwinAdapter {
  async fetchTwins(_tripId: string): Promise<TwinPack> {
    // 模擬網路請求延遲，讓 UI 有機會顯示 loading 狀態
    await new Promise<void>((resolve) => setTimeout(resolve, 200));
    return {
      ...EXPERIENCE_TWIN_FIXTURE,
      // 每次「fetch」更新 generated_at 時間戳，模擬真實 API 回傳時間
      generated_at: new Date().toISOString(),
    };
  }
}

/**
 * 對外匯出的 adapter 實例
 * 後端就緒後，在此替換為 RealExperienceTwinAdapter 實例即可。
 */
export const experienceTwinAdapter: IExperienceTwinAdapter =
  new ExperienceTwinFixtureAdapter();
