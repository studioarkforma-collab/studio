import { MapPin, Network, TrendingUp, Users } from 'lucide-react';
import { STRATEGIC_PILLARS, type StrategicPillar } from '../data/siteData';

function renderPillarIcon(icon: StrategicPillar['icon']) {
  const cls = 'w-6 h-6 text-[#262624] shrink-0 mt-0.5';
  switch (icon) {
    case 'location':
      return <MapPin className={cls} aria-hidden="true" />;
    case 'accessibility':
      return <Network className={cls} aria-hidden="true" />;
    case 'growth':
      return <TrendingUp className={cls} aria-hidden="true" />;
    case 'ecosystem':
      return <Users className={cls} aria-hidden="true" />;
  }
}

export function StrategicFooterStrip() {
  return (
    <footer className="bg-[#EFEFED] border-t border-[#D8D8D4]">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* 4 Strategic Pillars */}
        <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#C8C8C2] px-4 sm:px-6 py-5 gap-y-4 sm:gap-y-0">
          {STRATEGIC_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="flex items-start gap-3 sm:px-4 first:sm:pl-0 last:sm:pr-0"
            >
              {renderPillarIcon(pillar.icon)}
              <div>
                <h3 className="text-sm font-bold text-[#1D1D1B] leading-snug">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-xs text-[#52524E] leading-relaxed">
                  {pillar.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Angled Dark Charcoal Studio Ark Forma Block */}
        <div className="lg:col-span-3 bg-[#2B2B29] text-white angled-studio-block px-6 lg:pl-12 py-5 flex flex-col justify-center">
          <p className="text-sm font-semibold leading-snug text-white">
            Smarter Location Analysis.
            <br />
            Stronger Business Decisions.
          </p>
          <div className="my-2.5 h-px bg-white/30" aria-hidden="true" />
          <p className="text-xs tracking-[0.18em] text-[#E5E5E0] uppercase">
            <span className="font-light">STUDIO </span>
            <span className="font-bold">ARK</span>
            <span className="font-light"> FORMA</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
