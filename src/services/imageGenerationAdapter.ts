/**
 * Travel DNA Background Image Generation Adapter
 * 保留未來圖片生成服務的 adapter 介面，沿用專案既有服務結構。
 * 本次優先使用預先生成之本地背景（Prototype Generated Assets），
 * 當外部圖片不可用時提供漸層備援，不在使用者操作或 Demo 時呼叫外部 API。
 */

import { TRAVEL_DNA_SAMPLES, type TravelDnaCardSample } from '../data/travelDnaCards';

export interface ImageGenerationRequest {
  prompt: string;
  aspectRatio: '9:16' | '1:1' | '16:9';
  destination?: string;
  vibe?: string;
}

export interface ImageGenerationResult {
  imageUrl: string;
  source: 'preset_asset' | 'fallback_gradient' | 'external_api';
  status: 'ready' | 'pending' | 'fallback';
  label: string;
  attribution: string;
}

export interface IImageGenerationAdapter {
  getPresetBackground(cardId: TravelDnaCardSample['id']): ImageGenerationResult;
  generateBackground(request: ImageGenerationRequest): Promise<ImageGenerationResult>;
}

export class ImageGenerationAdapter implements IImageGenerationAdapter {
  getPresetBackground(cardId: TravelDnaCardSample['id']): ImageGenerationResult {
    const card = TRAVEL_DNA_SAMPLES.find((c) => c.id === cardId);
    if (!card) {
      return {
        imageUrl: '',
        source: 'fallback_gradient',
        status: 'fallback',
        label: '背景圖待補',
        attribution: 'CSS Gradient Fallback',
      };
    }

    return {
      imageUrl: card.imageSrc,
      source: 'preset_asset',
      status: 'ready',
      label: 'Prototype Generated Assets',
      attribution: 'Antigravity Generated Asset (Pre-rendered)',
    };
  }

  async generateBackground(request: ImageGenerationRequest): Promise<ImageGenerationResult> {
    // 競賽原型規範：不在使用者操作時呼叫即時外部 API，回傳預設本地資產或備援
    const matchingCard = TRAVEL_DNA_SAMPLES.find((c) =>
      request.prompt.toLowerCase().includes(c.id.split('-')[1] || '')
    );

    if (matchingCard) {
      return this.getPresetBackground(matchingCard.id);
    }

    return {
      imageUrl: '/images/travel-dna/urban-seoul.webp',
      source: 'preset_asset',
      status: 'ready',
      label: 'Prototype Generated Assets',
      attribution: 'Antigravity Generated Asset',
    };
  }
}

export const imageGenerationAdapter = new ImageGenerationAdapter();
