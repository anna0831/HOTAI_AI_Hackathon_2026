import type { PackManifest, KnowledgeItem, PackDownloadState } from '../domain/pack';
import defaultPackManifest from '../data/pack_manifest.json';
import defaultKnowledgeItems from '../data/knowledge_items.json';

const STORAGE_KEY_PACK_MANIFEST = 'chic_trip_pack_manifest';
const STORAGE_KEY_KNOWLEDGE_ITEMS = 'chic_trip_knowledge_items';
const STORAGE_KEY_DOWNLOAD_STATE = 'chic_trip_download_state';
/** Experience Twin 備案區塊的 localStorage key */
const STORAGE_KEY_TWINS = 'chic_trip_experience_twins';

export interface ILocalPackStore {
  getDownloadState(): PackDownloadState;
  setDownloadState(state: PackDownloadState): void;
  getManifest(): PackManifest | null;
  getKnowledgeItems(): KnowledgeItem[];
  savePack(manifest: PackManifest, items: KnowledgeItem[]): void;
  clearPack(): void;
  ensureDefaultPack(): void;
  /** 取得儲存的 Experience Twin 備案包；尚未儲存時回傳 null */
  getTwins(): import('../domain/twin').TwinPack | null;
  /** 將 Experience Twin 備案包儲存至 localStorage */
  saveTwins(pack: import('../domain/twin').TwinPack): void;
}

class LocalPackStore implements ILocalPackStore {
  getDownloadState(): PackDownloadState {
    try {
      const data = localStorage.getItem(STORAGE_KEY_DOWNLOAD_STATE);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // fallback in non-browser env or SSR
    }
    return {
      isDownloaded: false,
      downloadProgress: 0,
    };
  }

  setDownloadState(state: PackDownloadState): void {
    try {
      localStorage.setItem(STORAGE_KEY_DOWNLOAD_STATE, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save download state to localStorage', e);
    }
  }

  getManifest(): PackManifest | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY_PACK_MANIFEST);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // ignore
    }
    return null;
  }

  getKnowledgeItems(): KnowledgeItem[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_KNOWLEDGE_ITEMS);
      if (data) {
        return JSON.parse(data);
      }
    } catch {
      // ignore
    }
    // If pack is downloaded or default available
    return (defaultKnowledgeItems.items as unknown) as KnowledgeItem[];
  }

  savePack(manifest: PackManifest, items: KnowledgeItem[]): void {
    try {
      localStorage.setItem(STORAGE_KEY_PACK_MANIFEST, JSON.stringify(manifest));
      localStorage.setItem(STORAGE_KEY_KNOWLEDGE_ITEMS, JSON.stringify(items));
      this.setDownloadState({
        isDownloaded: true,
        downloadProgress: 100,
        downloadedAt: new Date().toISOString(),
        packId: manifest.pack_id,
        version: manifest.version,
        sizeKb: manifest.size_kb,
      });
    } catch (e) {
      console.warn('Failed to save pack to localStorage', e);
    }
  }

  clearPack(): void {
    try {
      localStorage.removeItem(STORAGE_KEY_PACK_MANIFEST);
      localStorage.removeItem(STORAGE_KEY_KNOWLEDGE_ITEMS);
      this.setDownloadState({
        isDownloaded: false,
        downloadProgress: 0,
      });
    } catch (e) {
      console.warn('Failed to clear pack from localStorage', e);
    }
  }

  ensureDefaultPack(): void {
    const state = this.getDownloadState();
    if (!state.isDownloaded) {
      this.savePack(
        defaultPackManifest as unknown as PackManifest,
        defaultKnowledgeItems.items as unknown as KnowledgeItem[]
      );
    }
    
    // Ensure Experience Twin demo data is also seeded (even if pack was already downloaded previously)
    if (!this.getTwins()) {
      import('../data/experienceTwinFixture').then(({ EXPERIENCE_TWIN_FIXTURE }) => {
        this.saveTwins(EXPERIENCE_TWIN_FIXTURE);
      }).catch(e => console.warn('Failed to seed default twin pack', e));
    }
  }

  /** 取得儲存的 Experience Twin 備案包；尚未儲存時回傳 null，不會 throw 。 */
  getTwins(): import('../domain/twin').TwinPack | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY_TWINS);
      return data ? (JSON.parse(data) as import('../domain/twin').TwinPack) : null;
    } catch {
      return null;
    }
  }

  /** 將 Experience Twin 備案包儲存至 localStorage。 */
  saveTwins(pack: import('../domain/twin').TwinPack): void {
    try {
      localStorage.setItem(STORAGE_KEY_TWINS, JSON.stringify(pack));
    } catch (e) {
      console.warn('[localPackStore] Failed to save experience twins', e);
    }
  }
}

export const localPackStore = new LocalPackStore();
