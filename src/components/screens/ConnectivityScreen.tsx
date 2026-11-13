import { useMemo, useState } from 'react';
import { Clock, Search, Train, Car, Footprints } from 'lucide-react';
import {
  LANDMARK_NODES,
  MAP_BOARD_IMAGE_PATH,
  type LandmarkCategory
} from '../../data/siteData';
import {
  estimateTravelMinutes,
  filterLandmarks,
  type TransportMode
} from '../../utils/locationAnalysis';
import { FadeInImage } from '../FadeInImage';
import { InsightsSidebar } from '../InsightsSidebar';

interface ConnectivityScreenProps {
  selectedLandmarkId: string;
  onSelectLandmark: (id: string) => void;
}

export function ConnectivityScreen({
  selectedLandmarkId,
  onSelectLandmark
}: ConnectivityScreenProps) {
  const [mode, setMode] = useState<TransportMode>('drive');
  const [isPeakHour, setIsPeakHour] = useState(false);
  const [category, setCategory] = useState<LandmarkCategory | 'all'>('all');
  const [query, setQuery] = useState('');

  const filteredNodes = useMemo(
    () =>
      filterLandmarks(
        LANDMARK_NODES.filter((n) => n.id !== 'business-site'),
        category,
        query
      ),
    [category, query]
  );

  return (
    <div className="max-w-[1600px] mx-auto bg-white border-x border-[#D8D8D4]">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-9 p-4 sm:p-6 space-y-6 min-w-0">
          {/* Top Summary + Context Map Thumbnail */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
            <div className="xl:col-span-7 flex flex-col justify-between bg-[#F7F7F5] border border-[#DCDCD7] p-5">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6E6E6A]">
                  Corridor & Transit Access
                </p>
                <h2 className="mt-1.5 text-xl font-bold text-[#1D1D1B]">
                  Multimodal Connectivity Matrix
                </h2>
                <p className="mt-2 text-sm text-[#52524E] leading-relaxed">
                  Direct frontage 0.3 km from the primary arterial highway and 1.2 km
                  from the elevated Metro Station ensures low-friction access for
                  commuters, regional freight, and destination visitors.
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-[#DCDCD7] grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <span className="text-xs text-[#6E6E6A] block">Arterial Road</span>
                  <span className="mt-0.5 text-lg font-mono tabular-nums font-bold text-[#1D1D1B]">
                    0.3 km
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#6E6E6A] block">Metro Link</span>
                  <span className="mt-0.5 text-lg font-mono tabular-nums font-bold text-[#1D1D1B]">
                    1.2 km
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#6E6E6A] block">Bus Terminal</span>
                  <span className="mt-0.5 text-lg font-mono tabular-nums font-bold text-[#1D1D1B]">
                    2.0 km
                  </span>
                </div>
                <div>
                  <span className="text-xs text-[#6E6E6A] block">Intl. Airport</span>
                  <span className="mt-0.5 text-lg font-mono tabular-nums font-bold text-[#1D1D1B]">
                    18.0 km
                  </span>
                </div>
              </div>
            </div>

            {/* Framed Architectural Site Reference Image with Fade-in */}
            <div className="xl:col-span-5 border border-[#DCDCD7] bg-[#EAEAE6] flex flex-col">
              <div className="relative w-full aspect-[1236/683] overflow-hidden">
                <FadeInImage
                  src={MAP_BOARD_IMAGE_PATH}
                  alt="Site corridor network overview showing major arterial road and metro corridor"
                  fallbackTitle="Corridor Network Graphic"
                  className="absolute max-w-none pointer-events-none select-none"
                  style={{
                    width: '124.27%',
                    height: '150.0%',
                    left: '0%',
                    top: '-21.15%'
                  }}
                />
              </div>
              <div className="px-3.5 py-2.5 bg-white border-t border-[#DCDCD7] flex items-center justify-between text-xs text-[#52524E]">
                <span>Ref. Sheet SAF-01 · Arterial & Metro Corridor</span>
                <span className="font-mono tabular-nums text-[#1D1D1B]">Scale 1:5000</span>
              </div>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 py-3 px-4 bg-[#F7F7F5] border border-[#DCDCD7]">
            <div className="flex flex-wrap items-center gap-2">
              <div
                role="group"
                aria-label="Travel mode"
                className="flex items-center gap-1 p-1 bg-[#EAEAE6] border border-[#D4D4CE]"
              >
                {(
                  [
                    { id: 'drive', label: 'Drive', icon: Car },
                    { id: 'metro', label: 'Metro', icon: Train },
                    { id: 'walk', label: 'Walk', icon: Footprints }
                  ] as const
                ).map(({ id, label, icon: Icon }) => {
                  const active = mode === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setMode(id)}
                      aria-pressed={active}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#262624] text-white'
                          : 'text-[#444440] hover:text-[#1D1D1B]'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={() => setIsPeakHour((prev) => !prev)}
                aria-pressed={isPeakHour}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium border transition-colors duration-100 whitespace-nowrap shrink-0 ${
                  isPeakHour
                    ? 'bg-[#262624] text-white border-[#262624]'
                    : 'bg-white text-[#3A3A36] border-[#D4D4CE] hover:border-[#262624]'
                }`}
              >
                <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{isPeakHour ? 'Peak Hour: On' : 'Off-Peak'}</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <label htmlFor="connectivity-category" className="sr-only">
                Filter by category
              </label>
              <select
                id="connectivity-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as LandmarkCategory | 'all')}
                className="px-3 py-1.5 text-xs bg-white border border-[#D4D4CE] text-[#1D1D1B]"
              >
                <option value="all">All Categories</option>
                <option value="transit">Transit</option>
                <option value="amenities">Amenities</option>
                <option value="commercial">Commercial</option>
                <option value="environment">Green Belt</option>
              </select>

              <div className="relative">
                <Search
                  className="w-3.5 h-3.5 text-[#6E6E6A] absolute left-2.5 top-1/2 -translate-y-1/2"
                  aria-hidden="true"
                />
                <label htmlFor="connectivity-search" className="sr-only">
                  Search nodes or corridors
                </label>
                <input
                  id="connectivity-search"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search node or corridor..."
                  className="pl-8 pr-3 py-1.5 text-xs bg-white border border-[#D4D4CE] text-[#1D1D1B] placeholder:text-[#8A8A84] w-48"
                />
              </div>
            </div>
          </div>

          {/* Connectivity Data Grid */}
          <div className="border border-[#DCDCD7] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F2F2EF] border-b border-[#DCDCD7] text-[11px] font-semibold uppercase tracking-wider text-[#52524E]">
                  <th className="py-3 px-4">Destination Node</th>
                  <th className="py-3 px-4">Access Corridor</th>
                  <th className="py-3 px-4">Strategic Role</th>
                  <th className="py-3 px-4 text-right">Distance</th>
                  <th className="py-3 px-4 text-right">
                    Est. Time ({mode === 'drive' ? 'Drive' : mode === 'metro' ? 'Metro' : 'Walk'})
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E7E3] text-sm">
                {filteredNodes.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 px-4 text-center text-xs text-[#6E6E6A]">
                      No matching corridor nodes found. Adjust your search or category filter.
                    </td>
                  </tr>
                ) : (
                  filteredNodes.map((node) => {
                    const eta = estimateTravelMinutes(node.distanceKm, mode, isPeakHour);
                    const isSelected = selectedLandmarkId === node.id;
                    return (
                      <tr
                        key={node.id}
                        className={`transition-colors ${
                          isSelected ? 'bg-[#F2F2EF]' : 'hover:bg-[#FAFAFA]'
                        }`}
                      >
                        <td className="py-3 px-4 font-semibold text-[#1D1D1B]">
                          <button
                            type="button"
                            onClick={() => onSelectLandmark(node.id)}
                            className="text-left hover:underline underline-offset-2"
                          >
                            {node.name}
                          </button>
                        </td>
                        <td className="py-3 px-4 text-xs text-[#52524E]">{node.corridor}</td>
                        <td className="py-3 px-4 text-xs text-[#52524E]">{node.strategicRole}</td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums text-xs text-[#1D1D1B]">
                          {node.distanceLabel}
                        </td>
                        <td className="py-3 px-4 text-right font-mono tabular-nums text-xs font-semibold text-[#1D1D1B]">
                          {eta} min
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="lg:col-span-3 flex flex-col">
          <InsightsSidebar
            selectedLandmarkId={selectedLandmarkId}
            onSelectLandmark={onSelectLandmark}
          />
        </div>
      </div>
    </div>
  );
}
