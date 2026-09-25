import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: 'blue' | 'yellow' | 'orange' | 'navy';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  badge,
  badgeColor = 'blue',
  className = '',
}) => {
  const badgeStyles = {
    blue: 'bg-[#00AEEF]/10 text-[#00AEEF] border-[#00AEEF]/20',
    yellow: 'bg-[#FFC400]/20 text-[#171B28] border-[#FFC400]/40',
    orange: 'bg-[#FF8614]/15 text-[#FF8614] border-[#FF8614]/30',
    navy: 'bg-[#143D5C]/10 text-[#143D5C] border-[#143D5C]/20',
  };

  return (
    <div className={`mb-3.5 ${className}`}>
      {badge && (
        <span
          className={`inline-block text-[11px] font-extrabold px-2.5 py-0.5 rounded-full border mb-1.5 ${badgeStyles[badgeColor]}`}
        >
          {badge}
        </span>
      )}
      <h2 className="text-xl sm:text-2xl font-black text-[#171B28] tracking-tight leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs sm:text-sm text-[#64748B] mt-1 leading-relaxed font-medium">
          {subtitle}
        </p>
      )}
    </div>
  );
};
