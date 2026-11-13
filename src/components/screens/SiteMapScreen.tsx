import { useMemo } from 'react';
import { Compass, Layers, MapPin, Navigation } from 'lucide-react';
import {
  LANDMARK_NODES,
  MAP_BOARD_IMAGE_PATH,
  type LandmarkCategory,
  type LandmarkNode
} from '../../data/siteData';
import { estimateTravelMinutes, filterLandmarks } from '../../utils/locationAnalysis';
import { FadeInImage } from '../FadeInImage';
import { InsightsSidebar } from '../InsightsSidebar';

interface SiteMapScreenProps {
  selectedLandmarkId: string;
  onSelectLandmark: (id: string) => void;
  activeCategory: LandmarkCategory | 'all';
  onSelectCategory: (category: LandmarkCategory | 'all') => void;
  onNavigateScreen: (screen: 'connectivity' | 'catchment' | 'comparison') => void;
}

const CATEGORY_FILTERS: { id: LandmarkCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All Nodes' },
  { id: 'transit', label: 'Transit' },
  { id: 'amenities', label: 'Amenities' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'environment', label: 'Green Belt' }
];

export function SiteMapScreen({
  selectedLandmarkId,
  onSelectLandmark,
  activeCategory,
  onSelectCategory,
  onNavigateScreen
}: SiteMapScreenProps) {
  const visibleNodes = useMemo(
    () => filterLandmarks(LANDMARK_NODES, activeCategory),
    [activeCategory]
  );

  const selectedNode: LandmarkNode = useMemo(
    () =>
      LANDMARK_NODES.find((node) => node.id === selectedLandmarkId) ??
      LANDMARK_NODES[0],
    [selectedLandmarkId]
  );

  const driveMin = estimateTravelMinutes(selectedNode.distanceKm, 'drive', false);
  const walkMin = estimateTravelMinutes(selectedNode.distanceKm, 'walk', false);

  return (
    <div className="max-w-[1600px] mx-auto bg-white border-x border-[#D8D8D4]">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        {/* Main Isometric Map Column */}
        <div className="lg:col-span-9 flex flex-col min-w-0">
          {/* Interactive Layer Toolbar */}
          <div className="px-4 sm:px-6 py-3 bg-[#F7F7F5] border-b border-[#DFDFDB] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[#52524E]">
              <Layers className="w-4 h-4 text-[#262624]" aria-hidden="true" />
              <span className="font-semibold text-[#1D1D1B] uppercase tracking-wider">
                Layer Filter
              </span>
            </div>

            <div
              role="group"
              aria-label="Filter map landmarks by category"
              className="flex flex-wrap items-center gap-1 p-1 bg-[#EAEAE6] border border-[#D4D4CE]"
            >
              {CATEGORY_FILTERS.map((filter) => {
                const active = activeCategory === filter.id;
                return (
                  <button
                    key={filter.id}
                    type="button"
                    onClick={() => onSelectCategory(filter.id)}
                    aria-pressed={active}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-[#262624] ${
                      active
                        ? 'bg-[#262624] text-white'
                        : 'text-[#444440] hover:text-[#1D1D1B] hover:bg-white/60'
                    }`}
                  >
                    {filter.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Isometric Site Map Viewport (Cropped cleanly to the isometric map region) */}
          <div className="relative w-full aspect-[1236/683] overflow-hidden bg-[#D9D9D5]">
            <FadeInImage
              src={MAP_BOARD_IMAGE_PATH}
              alt="Isometric architectural site analysis map showing Business Site, Metro Station, City Hospital, University, Lifestyle Mall, Auto Showroom, Petrol Pump, Industrial Zone, and Green Belt"
              fallbackTitle="Strategic Site Isometric Map"
              className="absolute max-w-none pointer-events-none select-none"
              style={{
                width: '124.27%',
                height: '150.0%',
                left: '0%',
                top: '-21.15%'
              }}
            />

            {/* Subtle Interactive Hotspot Targets aligned to Map Landmarks */}
            <div className="absolute inset-0">
              {LANDMARK_NODES.map((node) => {
                const isMatched =
                  activeCategory === 'all' ||
                  node.category === activeCategory ||
                  node.id === 'business-site';
                const isSelected = selectedNode.id === node.id;

                return (
                  <button
                    key={node.id}
                    type="button"
                    onClick={() => onSelectLandmark(node.id)}
                    aria-label={`Inspect ${node.name} (${node.distanceLabel})`}
                    aria-pressed={isSelected}
                    style={{
                      left: `${node.xPct}%`,
                      top: `${node.yPct}%`
                    }}
                    className={`group absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D1D1B] ${
                      isMatched ? 'opacity-100' : 'opacity-30'
                    }`}
                  >
                    <span
                      className={`block rounded-full transition-transform duration-150 ${
                        isSelected
                          ? 'w-5 h-5 border-2 border-[#1D1D1B] bg-white/90 ring-4 ring-[#1D1D1B]/30 scale-110'
                          : 'w-2.5 h-2.5 border border-white/90 bg-[#1D1D1B]/45 group-hover:scale-150 group-hover:bg-[#1D1D1B]'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Architectural Node Inspector Bar (Below Map — zero overlap with map labels) */}
          <div className="px-4 sm:px-6 py-4 bg-[#F7F7F5] border-t border-[#DFDFDB] flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="w-9 h-9 bg-[#262624] text-white flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5">
                  <h3 className="text-sm font-bold text-[#1D1D1B]">
                    {selectedNode.name}
                  </h3>
                  <span className="text-xs text-[#6E6E6A]" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-xs font-medium text-[#52524E]">
                    {selectedNode.strategicRole}
                  </span>
                  <span className="text-xs text-[#6E6E6A]" aria-hidden="true">
                    ·
                  </span>
                  <span className="text-xs font-mono tabular-nums text-[#1D1D1B]">
                    {selectedNode.distanceLabel}
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#52524E] leading-relaxed max-w-3xl">
                  {selectedNode.architecturalNote}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 border-[#DFDFDB]">
              <div className="text-xs">
                <span className="text-[#6E6E6A] block">Est. Travel</span>
                <span className="font-mono tabular-nums font-semibold text-[#1D1D1B]">
                  {selectedNode.distanceKm === 0
                    ? 'On-Site Origin'
                    : `${driveMin} min drive · ${walkMin} min walk`}
                </span>
              </div>
              <button
                type="button"
                onClick={() => onNavigateScreen('connectivity')}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold border border-[#262624] text-[#1D1D1B] hover:bg-[#262624] hover:text-white transition-colors whitespace-nowrap shrink-0"
              >
                <Navigation className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Transit Matrix</span>
              </button>
            </div>
          </div>

          {/* Quick Landmark Selector Strip */}
          <div className="px-4 sm:px-6 py-2.5 bg-white border-t border-[#E7E7E3] flex items-center gap-2 overflow-x-auto">
            <Compass className="w-3.5 h-3.5 text-[#6E6E6A] shrink-0" aria-hidden="true" />
            <span className="text-[11px] font-medium text-[#6E6E6A] uppercase tracking-wider shrink-0 mr-1">
              Visible ({visibleNodes.length}):
            </span>
            {visibleNodes.map((node) => {
              const active = selectedNode.id === node.id;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => onSelectLandmark(node.id)}
                  className={`px-2.5 py-1 text-xs transition-colors whitespace-nowrap shrink-0 border ${
                    active
                      ? 'border-[#262624] bg-[#262624] text-white font-medium'
                      : 'border-[#DCDCD7] bg-[#F9F9F7] text-[#3A3A36] hover:border-[#262624]'
                  }`}
                >
                  {node.name}{' '}
                  <span className="font-mono tabular-nums opacity-75">
                    ({node.distanceLabel})
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Dark Charcoal Key Insights Sidebar */}
        <div className="lg:col-span-3 flex flex-col">
          <InsightsSidebar
            selectedLandmarkId={selectedNode.id}
            onSelectLandmark={onSelectLandmark}
          />
        </div>
      </div>
    </div>
  );
}
