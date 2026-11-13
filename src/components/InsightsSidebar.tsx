import { Building2, MapPin, Target, TrendingUp } from 'lucide-react';
import { KEY_INSIGHT_SECTIONS, type InsightSection } from '../data/siteData';

interface InsightsSidebarProps {
  selectedLandmarkId: string | null;
  onSelectLandmark: (landmarkId: string) => void;
}

function renderSectionIcon(icon: InsightSection['icon']) {
  const cls = 'w-5 h-5 text-white shrink-0';
  switch (icon) {
    case 'connectivity':
      return <MapPin className={cls} aria-hidden="true" />;
    case 'amenities':
      return <Building2 className={cls} aria-hidden="true" />;
    case 'growth':
      return <TrendingUp className={cls} aria-hidden="true" />;
    case 'catchment':
      return <Target className={cls} aria-hidden="true" />;
  }
}

export function InsightsSidebar({
  selectedLandmarkId,
  onSelectLandmark
}: InsightsSidebarProps) {
  return (
    <aside
      aria-label="Key Location Insights"
      className="bg-[#2B2B29] text-[#EAEAE6] flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#3D3D3A]"
    >
      <div>
        <div className="px-5 pt-5 pb-3 border-b border-[#40403D]">
          <h2 className="text-base font-bold tracking-[0.06em] uppercase text-white">
            Key Insights
          </h2>
        </div>

        <div className="divide-y divide-[#40403D]">
          {KEY_INSIGHT_SECTIONS.map((section) => (
            <section key={section.id} className="px-5 py-4">
              <div className="flex items-start gap-3">
                <div className="pt-0.5">{renderSectionIcon(section.icon)}</div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white mb-2">
                    {section.title}
                  </h3>
                  <dl className="space-y-1.5">
                    {section.items.map((item) => {
                      const isInteractive = Boolean(item.landmarkId);
                      const isSelected =
                        item.landmarkId && selectedLandmarkId === item.landmarkId;

                      return (
                        <div
                          key={item.id}
                          className={`flex items-baseline justify-between gap-2 text-xs leading-relaxed ${
                            isSelected ? 'text-white font-semibold' : 'text-[#D4D4CF]'
                          }`}
                        >
                          <dt className="truncate">
                            {isInteractive ? (
                              <button
                                type="button"
                                onClick={() =>
                                  item.landmarkId && onSelectLandmark(item.landmarkId)
                                }
                                className={`text-left hover:text-white underline-offset-2 focus-visible:outline-1 focus-visible:outline-white ${
                                  isSelected ? 'underline text-white' : 'hover:underline'
                                }`}
                              >
                                {item.label}
                              </button>
                            ) : (
                              item.label
                            )}
                          </dt>
                          <dd className="font-mono tabular-nums text-white/90 shrink-0">
                            : {item.value}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>

      {/* Architectural Map Legend */}
      <div className="px-5 py-4 border-t border-[#40403D] bg-[#242422]">
        <h3 className="sr-only">Map Legend</h3>
        <ul className="space-y-2 text-xs text-[#E2E2DC]">
          <li className="flex items-center gap-3">
            <span className="w-14 flex items-center shrink-0" aria-hidden="true">
              <svg viewBox="0 0 56 8" className="w-full h-2">
                <line x1="0" y1="4" x2="56" y2="4" stroke="#E5E5E0" strokeWidth="3.5" />
                <line x1="0" y1="4" x2="56" y2="4" stroke="#242422" strokeWidth="1" />
              </svg>
            </span>
            <span>Major Road</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-14 flex items-center shrink-0" aria-hidden="true">
              <svg viewBox="0 0 56 8" className="w-full h-2">
                <line x1="0" y1="3" x2="56" y2="3" stroke="#A3A39E" strokeWidth="1.2" />
                <line x1="0" y1="6" x2="56" y2="6" stroke="#A3A39E" strokeWidth="1.2" />
              </svg>
            </span>
            <span>Metro Line</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-14 flex items-center shrink-0" aria-hidden="true">
              <svg viewBox="0 0 56 8" className="w-full h-2">
                <line
                  x1="0"
                  y1="4"
                  x2="56"
                  y2="4"
                  stroke="#B8B8B2"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
              </svg>
            </span>
            <span>Proposed Metro Line</span>
          </li>
          <li className="flex items-center gap-3">
            <span className="w-14 flex items-center shrink-0" aria-hidden="true">
              <svg viewBox="0 0 56 12" className="w-full h-3">
                <rect
                  x="1"
                  y="1.5"
                  width="54"
                  height="9"
                  fill="#444440"
                  stroke="#E5E5E0"
                  strokeWidth="1.2"
                  strokeDasharray="5 3"
                />
              </svg>
            </span>
            <span>Project Site</span>
          </li>
        </ul>
      </div>
    </aside>
  );
}
