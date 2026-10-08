/**
 * Experience Twin（體驗雙生備案）型別定義
 *
 * 設計原則：
 * - 純型別定義，不依賴任何服務或資料
 * - 與 pack.ts / trip.ts 職責分離，不混入既有介面
 * - 所有欄位均為必填（except location/suggested_time 依 type 而定）
 */

/** 備案類型 */
export type TwinType =
  | 'place_alternative'  // 地點替代：體驗相近、人潮較少的景點
  | 'time_alternative';  // 時段替代：改去相同景點較舒適的時段

/** 單一備案項目 */
export interface ExperienceTwin {
  /** 備案唯一識別碼 */
  twin_id: string;
  /** 對應原行程 ItineraryItem.id */
  source_item_id: string;
  /** 原景點名稱（方便 UI 對照顯示，無需二次查詢） */
  source_item_title: string;
  /** 備案類型 */
  type: TwinType;
  /** 備案名稱 */
  name: string;
  /** 推薦理由（體驗相近 / 人潮較少 / 較舒適時段等） */
  reason: string;
  /** 備案地點（地點替代時填寫） */
  location?: string;
  /** 建議改去的時段（時段替代時填寫，格式 HH:MM） */
  suggested_time?: string;
  /** 體驗標籤，例如：['人潮較少', '相似風格', '世界遺產'] */
  tags: string[];
  /**
   * 離線免責聲明
   * 離線端只讀預先算好的靜態結果，不保證最新營業時間、即時人潮或交通狀況。
   */
  offline_note: string;
}

/**
 * 整包備案集合
 * 以 trip_id 為 key 儲存，與守護包同步進入 localStorage
 */
export interface TwinPack {
  /** 對應行程 ID */
  trip_id: string;
  /** 備案資料生成時間（ISO 8601） */
  generated_at: string;
  /** 備案清單 */
  twins: ExperienceTwin[];
  /**
   * 固定標記為 fixture 資料
   * 表示此備案為前端靜態模擬，非真實後端演算法即時運算結果
   */
  is_fixture: true;
}
