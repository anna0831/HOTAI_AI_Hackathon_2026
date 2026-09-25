export type PackSectionType = 
  | 'itinerary' 
  | 'transport' 
  | 'places' 
  | 'esim_help' 
  | 'emergency' 
  | 'phrases';

export interface PackManifest {
  pack_id: string;
  trip_id: string;
  version: string;
  generated_at: string;
  valid_until: string;
  size_kb: number;
  sections: PackSectionType[];
  title: string;
  destination: string;
  total_passages: number;
  mock: true;
}

export interface KnowledgeItem {
  id: string;
  type: PackSectionType;
  title: string;
  content: string;
  keywords: string[];
  freshness: 'stable' | 'personal';
  updated_at: string;
  source_label: string;
  confidence_hint?: string;
  mock: true;
}

export interface PackDownloadState {
  isDownloaded: boolean;
  downloadProgress: number; // 0 to 100
  downloadedAt?: string;
  packId?: string;
  version?: string;
  sizeKb?: number;
}
