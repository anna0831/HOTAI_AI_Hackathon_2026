import React from 'react';
import { MapPin, Sparkles, Compass, Tag } from 'lucide-react';
import type { TravelProfile } from '../app/store';

interface TravelDNAResultCardProps {
  profile: TravelProfile;
  destinationLabel?: string;
}

export const TravelDNAResultCard: React.FC<TravelDNAResultCardProps> = ({
  profile,
  destinationLabel = '首爾 5 日・Anna 自由行',
}) => {
  return (
    <div className="rounded-3xl bg-white border-2 border-[#00AEEF]/30 p-5 shadow-lg shadow-slate-200/60 relative overflow-hidden text-[#171B28]">
      {/* Decorative top chicTrip accent bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#00AEEF] via-[#FFC400] to-[#FF8614]" />

      {/* Header of card */}
      <div className="flex items-center justify-between pt-1 mb-3">
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg bg-[#00AEEF]/10 text-[#00AEEF] flex items-center justify-center">
            <Compass className="w-3.5 h-3.5" />
          </div>
          <span className="font-extrabold text-xs tracking-tight text-[#143D5C]">
            去趣 chicTrip・Travel DNA
          </span>
        </div>
        <span className="text-[11px] font-semibold text-[#64748B] flex items-center gap-1 bg-[#F4F7FB] px-2.5 py-0.5 rounded-full border border-slate-200">
          <MapPin className="w-3 h-3 text-[#FF8614]" />
          {destinationLabel}
        </span>
      </div>

      {/* Main Persona Title */}
      <div className="my-2">
        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFC400]/20 text-[#171B28] text-xs font-bold mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-[#FF8614]" />
          <span>{profile.badge}</span>
        </div>
        <h2 className="text-2xl font-black text-[#171B28] tracking-tight leading-tight">
          {profile.type}
        </h2>
      </div>

      {/* Quote / Tagline */}
      <div className="p-3.5 rounded-2xl bg-[#F4F7FB] border-l-4 border-[#00AEEF] my-3">
        <p className="text-xs text-[#143D5C] italic font-medium leading-relaxed">
          「{profile.tagline}」
        </p>
      </div>

      {/* Description */}
      <p className="text-xs text-[#64748B] leading-relaxed mb-4">
        {profile.description}
      </p>

      {/* Feature tags */}
      <div className="pt-3 border-t border-slate-100">
        <div className="text-[11px] font-bold text-[#143D5C] mb-2 flex items-center gap-1">
          <Tag className="w-3 h-3 text-[#00AEEF]" />
          <span>AI 行程偏好與流量特徵：</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {profile.matched_tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-xl bg-[#F4F7FB] text-[#143D5C] text-xs font-semibold border border-slate-200/80 shadow-2xs"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
