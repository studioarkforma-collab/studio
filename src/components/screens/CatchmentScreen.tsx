import { useMemo, useState } from 'react';
import { LANDMARK_NODES, MAP_BOARD_IMAGE_PATH } from '../../data/siteData';
import { calculateCatchmentMetrics } from '../../utils/locationAnalysis';
import { FadeInImage } from '../FadeInImage';
import { InsightsSidebar } from '../InsightsSidebar';

interface CatchmentScreenProps {
  selectedLandmarkId: string;
  onSelectLandmark: (id: string) => void;
}

const PRESET_RADII = [
  { label: 'Immediate (1.0 km)', value: 1.0 },
  { label: 'Primary Zone (3.0 km)', value: 3.0 },
  { label: 'Secondary Zone (5.0 km)', value: 5.0 },
  { label: 'Metro Reach (8.0 km)', value: 8.0 }
];

export function CatchmentScreen({
  selectedLandmarkId,
  onSelectLandmark
}: CatchmentScreenProps) {
  const [radiusKm, setRadiusKm] = useState(3.0);

  const metrics = useMemo(
    () => calculateCatchmentMetrics(radiusKm, LANDMARK_NODES),
    [radiusKm]
  );

  const nodesInside = useMemo(
    () => LANDMARK_NODES.filter((n) => n.id !== 'business-site' && n.distanceKm <= radiusKm),
    [radiusKm]
  );

  return (
    <div className="max-w-[1600px] mx-auto bg-white border-x border-[#D8D8D4]">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-9 p-4 sm:p-6 space-y-6 min-w-0">
          {/* Header & Radius Controls */}
          <div className="bg-[#F7F7F5] border border-[#DCDCD7] p-5 flex flex-col xl:flex-row xl:items-center justify-between gap-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6E6E6A]">
                Demographic & Spatial Reach
              </p>
              <h2 className="mt-1 text-xl font-bold text-[#1D1D1B]">
                Catchment Area Model · {metrics.zoneLabel}
              </h2>
              <p className="mt-1 text-xs text-[#52524E]">
                Adjust radial influence rings to evaluate residential density, daily commuter
                flow, and captured urban anchors around the Business Site.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {PRESET_RADII.map((preset) => {
                const active = Math.abs(radiusKm - preset.value) < 0.05;
                return (
                  <button
                    key={preset.value}
                    type="button"
                    onClick={() => setRadiusKm(preset.value)}
                    aria-pressed={active}
                    className={`px-3 py-1.5 text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#262624] text-white border-[#262624]'
                        : 'bg-white text-[#3A3A36] border-[#D4D4CE] hover:border-[#262624]'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slider + Live KPI Strip */}
          <div className="border border-[#DCDCD7] p-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <label
                htmlFor="catchment-radius-slider"
                className="text-xs font-semibold uppercase tracking-wider text-[#1D1D1B]"
              >
                Active Catchment Radius:{' '}
                <span className="font-mono tabular-nums text-sm ml-1">
                  {metrics.radiusKm.toFixed(1)} km
                </span>
              </label>
              <input
                id="catchment-radius-slider"
                type="range"
                min={0.5}
                max={10}
                step={0.5}
                value={radiusKm}
                onChange={(e) => setRadiusKm(Number(e.target.value))}
                className="w-full sm:w-72 accent-[#262624]"
              />
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#E7E7E3]">
              <div>
                <span className="text-xs text-[#6E6E6A] block">Zone Classification</span>
                <span className="mt-1 text-base font-bold text-[#1D1D1B] block">
                  {metrics.zoneLabel}
                </span>
              </div>
              <div>
                <span className="text-xs text-[#6E6E6A] block">Est. Population Reach</span>
                <span className="mt-1 text-xl font-mono tabular-nums font-bold text-[#1D1D1B] block">
                  {metrics.estimatedPopulation.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-xs text-[#6E6E6A] block">Active Households</span>
                <span className="mt-1 text-xl font-mono tabular-nums font-bold text-[#1D1D1B] block">
                  {metrics.households.toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-xs text-[#6E6E6A] block">Daily Transit Flow</span>
                <span className="mt-1 text-xl font-mono tabular-nums font-bold text-[#1D1D1B] block">
                  {metrics.dailyTransitVolume.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Two-Column Visual: SVG Concentric Diagram + Cropped Site Image */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
            <div className="xl:col-span-6 border border-[#DCDCD7] bg-[#F7F7F5] p-5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#1D1D1B]">
                  Concentric Influence Rings
                </h3>
                <span className="text-xs font-mono tabular-nums text-[#52524E]">
                  {nodesInside.length} / {LANDMARK_NODES.length - 1} Nodes Captured
                </span>
              </div>

              <div className="flex items-center justify-center py-2">
                <svg
                  viewBox="0 0 420 290"
                  className="w-full max-w-[420px] h-auto"
                  role="img"
                  aria-label={`Concentric catchment ring diagram at ${metrics.radiusKm} km radius`}
                >
                  {/* Reference 5km & 3km rings */}
                  <circle
                    cx="210"
                    cy="145"
                    r="108"
                    fill="none"
                    stroke="#D4D4CE"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  <circle
                    cx="210"
                    cy="145"
                    r="66"
                    fill="none"
                    stroke="#B8B8B2"
                    strokeWidth="1"
                    strokeDasharray="4 4"
                  />
                  {/* Dynamic Active Radius Ring */}
                  <circle
                    cx="210"
                    cy="145"
                    r={Math.min(116, Math.max(18, (radiusKm / 8) * 108))}
                    fill="rgba(38, 38, 36, 0.08)"
                    stroke="#1D1D1B"
                    strokeWidth="2"
                  />
                  <text
                    x="210"
                    y="29"
                    fontSize="9"
                    textAnchor="middle"
                    fill="#6E6E6A"
                    fontFamily="monospace"
                    paintOrder="stroke"
                    stroke="#F7F7F5"
                    strokeWidth="4"
                  >
                    5.0 km Secondary
                  </text>
                  <text
                    x="210"
                    y="72"
                    fontSize="9"
                    textAnchor="middle"
                    fill="#52524E"
                    fontFamily="monospace"
                    paintOrder="stroke"
                    stroke="#F7F7F5"
                    strokeWidth="4"
                  >
                    3.0 km Primary
                  </text>

                  {/* Site Center */}
                  <circle cx="210" cy="145" r="5.5" fill="#1D1D1B" />
                  <text
                    x="210"
                    y="162"
                    fontSize="9.5"
                    fontWeight="700"
                    textAnchor="middle"
                    fill="#1D1D1B"
                    paintOrder="stroke"
                    stroke="#F7F7F5"
                    strokeWidth="4"
                  >
                    Business Site
                  </text>

                  {/* Plot Captured Nodes along clean angular sectors */}
                  {LANDMARK_NODES.filter((n) => n.id !== 'business-site').map((node, idx) => {
                    const angle = (idx / 8) * Math.PI * 2 - Math.PI / 2 + Math.PI / 8;
                    const distPx = 28 + (node.distanceKm / 3.2) * 72;
                    const cx = 210 + Math.cos(angle) * distPx;
                    const cy = 145 + Math.sin(angle) * distPx;
                    const labelDist = Math.max(distPx + 14, 118);
                    const lx = 210 + Math.cos(angle) * labelDist;
                    const ly = 145 + Math.sin(angle) * labelDist;
                    const inside = node.distanceKm <= radiusKm;
                    const isRight = Math.cos(angle) >= 0;

                    return (
                      <g key={node.id}>
                        <line
                          x1={cx}
                          y1={cy}
                          x2={lx}
                          y2={ly}
                          stroke={inside ? '#52524E' : '#C8C8C2'}
                          strokeWidth="0.75"
                        />
                        <circle
                          cx={cx}
                          cy={cy}
                          r={inside ? 4 : 2.5}
                          fill={inside ? '#1D1D1B' : '#A3A39E'}
                        />
                        <text
                          x={lx + (isRight ? 4 : -4)}
                          y={ly + 3}
                          fontSize="9"
                          textAnchor={isRight ? 'start' : 'end'}
                          fill={inside ? '#1D1D1B' : '#7A7A75'}
                          fontWeight={inside ? '600' : '400'}
                          paintOrder="stroke"
                          stroke="#F7F7F5"
                          strokeWidth="3"
                        >
                          {node.name}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>
            </div>

            <div className="xl:col-span-6 border border-[#DCDCD7] bg-[#EAEAE6] flex flex-col justify-between">
              <div className="relative w-full aspect-[1236/683] overflow-hidden">
                <FadeInImage
                  src={MAP_BOARD_IMAGE_PATH}
                  alt="Isometric site catchment boundary visualization"
                  fallbackTitle="Catchment Isometric Context"
                  className="absolute max-w-none pointer-events-none select-none"
                  style={{
                    width: '124.27%',
                    height: '150.0%',
                    left: '0%',
                    top: '-21.15%'
                  }}
                />
              </div>
              <div className="p-4 bg-white border-t border-[#DCDCD7]">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#1D1D1B] mb-2">
                  Nodes Captured Within {metrics.radiusKm.toFixed(1)} km
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {nodesInside.length === 0 ? (
                    <span className="text-xs text-[#6E6E6A]">
                      Increase radius above 0.5 km to capture surrounding urban anchors.
                    </span>
                  ) : (
                    nodesInside.map((node) => (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => onSelectLandmark(node.id)}
                        className="px-2.5 py-1 text-xs border border-[#DCDCD7] bg-[#F7F7F5] text-[#1D1D1B] hover:border-[#262624]"
                      >
                        {node.name}{' '}
                        <span className="font-mono tabular-nums text-[#6E6E6A]">
                          {node.distanceLabel}
                        </span>
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>
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
