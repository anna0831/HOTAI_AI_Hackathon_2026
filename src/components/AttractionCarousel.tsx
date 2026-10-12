import React, { useState } from 'react';
import { Camera, Maximize2 } from 'lucide-react';
import type { AttractionImage } from '../data/seoulImageManifest';
import { ImagePlaceholder } from './ImagePlaceholder';
import { ImageLightbox } from './ImageLightbox';

interface AttractionCarouselProps {
  attractions: AttractionImage[];
  dayNumber: number;
}

export const AttractionCarousel: React.FC<AttractionCarouselProps> = ({
  attractions,
  dayNumber,
}) => {
  const [selectedImage, setSelectedImage] = useState<AttractionImage | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  if (!attractions || attractions.length === 0) {
    return (
      <ImagePlaceholder
        title={`Day ${dayNumber} 景點照片準備中`}
        subtitle="尚無收錄之景點清單"
        aspectRatio="16/9"
      />
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-[11px] text-[#64748B] font-semibold px-0.5">
        <span className="flex items-center gap-1.5 text-[#143D5C]">
          <Camera className="w-3.5 h-3.5 text-[#00AEEF] stroke-[2.5]" />
          <span>精選打卡景點 ({attractions.length} 處)</span>
        </span>
        <span className="text-[10px] text-[#64748B] font-medium hidden sm:inline">
          點擊圖片放大檢視・左右滑動瀏覽
        </span>
      </div>

      {/* Horizontal Carousel Container */}
      <div className="flex gap-3 overflow-x-auto pb-2 pt-0.5 snap-x snap-mandatory scrollbar-thin scroll-smooth focus:outline-none">
        {attractions.map((item, idx) => {
          const hasFailed = failedImages[item.id];

          return (
            <div
              key={item.id}
              className="flex-none w-[200px] sm:w-[220px] snap-start group cursor-pointer focus:outline-none"
              onClick={() => {
                if (!hasFailed) {
                  setSelectedImage(item);
                }
              }}
              onKeyDown={(e) => {
                if ((e.key === 'Enter' || e.key === ' ') && !hasFailed) {
                  e.preventDefault();
                  setSelectedImage(item);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`放大檢視景點：${item.attractionName}`}
            >
              {/* Thumbnail Container */}
              <div className="relative aspect-[4/3] bg-slate-100 border border-slate-200/90 rounded-none overflow-hidden shadow-2xs group-hover:border-[#00AEEF] transition-colors">
                {hasFailed ? (
                  <ImagePlaceholder
                    aspectRatio="4/3"
                    title={item.attractionName}
                    subtitle="圖檔待放入"
                    badge={`#${idx + 1}`}
                  />
                ) : (
                  <>
                    <img
                      src={item.imagePath}
                      alt={item.altText}
                      loading="lazy"
                      onError={() => handleImageError(item.id)}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 select-none"
                    />
                    {/* Hover Overlay Hint */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                      <span className="px-2 py-1 bg-[#171B28]/85 text-[10px] font-bold rounded-none flex items-center gap-1">
                        <Maximize2 className="w-3 h-3 text-[#00AEEF]" />
                        放大
                      </span>
                    </div>

                    {/* Badge */}
                    <span className="absolute top-1.5 left-1.5 text-[10px] font-black font-mono px-1.5 py-0.5 bg-black/60 text-white rounded-none">
                      {idx + 1}
                    </span>
                  </>
                )}
              </div>

              {/* Title & Description Below Thumbnail */}
              <div className="mt-1.5 px-0.5">
                <div className="text-xs font-black text-[#171B28] group-hover:text-[#00AEEF] transition-colors truncate">
                  {item.attractionName}
                </div>
                <div className="text-[10px] text-[#64748B] font-medium truncate mt-0.5">
                  {item.altText}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox for Selected Attraction Image */}
      {selectedImage && (
        <ImageLightbox
          isOpen={!!selectedImage}
          onClose={() => setSelectedImage(null)}
          imageSrc={selectedImage.imagePath}
          altText={selectedImage.altText}
          title={`Day ${dayNumber}・${selectedImage.attractionName}`}
          subtitle={selectedImage.altText}
          credit={selectedImage.imageCredit}
        />
      )}
    </div>
  );
};
