import { useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { CANDIDATE_SITES, MAP_BOARD_IMAGE_PATH } from '../../data/siteData';
import { scoreSiteFeasibility } from '../../utils/locationAnalysis';
import { FadeInImage } from '../FadeInImage';
import { InsightsSidebar } from '../InsightsSidebar';

interface ComparisonScreenProps {
  selectedLandmarkId: string;
  onSelectLandmark: (id: string) => void;
  onOpenExport: () => void;
}

export function ComparisonScreen({
  selectedLandmarkId,
  onSelectLandmark,
  onOpenExport
}: ComparisonScreenProps) {
  const [focusedSiteId, setFocusedSiteId] = useState(CANDIDATE_SITES[0].id);

  const scoredSites = useMemo(
    () =>
      CANDIDATE_SITES.map((site) => ({
        site,
        score: scoreSiteFeasibility(site)
      })),
    []
  );

  const activeEntry =
    scoredSites.find((entry) => entry.site.id === focusedSiteId) ?? scoredSites[0];

  return (
    <div className="max-w-[1600px] mx-auto bg-white border-x border-[#D8D8D4]">
      <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
        <div className="lg:col-span-9 p-4 sm:p-6 space-y-6 min-w-0">
          {/* Site Selection Strip */}
          <div className="bg-[#F7F7F5] border border-[#DCDCD7] p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#6E6E6A]">
                Feasibility Evaluation
              </p>
              <h2 className="mt-1 text-xl font-bold text-[#1D1D1B]">
                Candidate Parcel Comparison
              </h2>
            </div>

            <div
              role="group"
              aria-label="Select candidate site to inspect"
              className="flex flex-wrap items-center gap-1.5"
            >
              {scoredSites.map(({ site }) => {
                const active = site.id === activeEntry.site.id;
                return (
                  <button
                    key={site.id}
                    type="button"
                    onClick={() => setFocusedSiteId(site.id)}
                    aria-pressed={active}
                    className={`px-3 py-1.5 text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-[#262624] text-white border-[#262624]'
                        : 'bg-white text-[#3A3A36] border-[#D4D4CE] hover:border-[#262624]'
                    }`}
                  >
                    {site.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Focused Parcel Dossier + Visual Preview */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-stretch">
            <div className="xl:col-span-7 border border-[#DCDCD7] p-5 flex flex-col justify-between bg-white">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E7E7E3]">
                  <div>
                    <span className="text-xs font-mono text-[#6E6E6A]">
                      {activeEntry.site.code}
                    </span>
                    <h3 className="text-lg font-bold text-[#1D1D1B]">
                      {activeEntry.site.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-[#6E6E6A] block">
                      Feasibility Index
                    </span>
                    <span className="text-xl font-mono tabular-nums font-bold text-[#1D1D1B]">
                      {activeEntry.score.totalScore}/100 · {activeEntry.score.tier}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-sm text-[#52524E] leading-relaxed">
                  {activeEntry.site.notes}
                </p>

                <dl className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E7E7E3]">
                  <div>
                    <dt className="text-xs text-[#6E6E6A]">Zoning</dt>
                    <dd className="text-xs font-semibold text-[#1D1D1B] mt-0.5">
                      {activeEntry.site.zoning}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#6E6E6A]">Plot Area</dt>
                    <dd className="text-xs font-mono tabular-nums font-semibold text-[#1D1D1B] mt-0.5">
                      {activeEntry.site.plotAreaSqm.toLocaleString()} m²
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#6E6E6A]">Road Frontage</dt>
                    <dd className="text-xs font-mono tabular-nums font-semibold text-[#1D1D1B] mt-0.5">
                      {activeEntry.site.frontageMeters} m
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#6E6E6A]">Connectivity Score</dt>
                    <dd className="text-xs font-mono tabular-nums font-semibold text-[#1D1D1B] mt-0.5">
                      {activeEntry.score.connectivityScore} / 100
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#6E6E6A]">Amenities Score</dt>
                    <dd className="text-xs font-mono tabular-nums font-semibold text-[#1D1D1B] mt-0.5">
                      {activeEntry.score.amenitiesScore} / 100
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-[#6E6E6A]">Growth Score</dt>
                    <dd className="text-xs font-mono tabular-nums font-semibold text-[#1D1D1B] mt-0.5">
                      {activeEntry.score.growthScore} / 100
                    </dd>
                  </div>
                </dl>
              </div>

              <div className="mt-5 pt-4 border-t border-[#E7E7E3] flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#262624]">
                  <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                  <span>Verified against Studio Ark Forma Spatial Criteria</span>
                </span>
                <button
                  type="button"
                  onClick={onOpenExport}
                  className="px-3.5 py-2 text-xs font-semibold bg-[#262624] text-white hover:bg-[#141413] transition-colors whitespace-nowrap shrink-0"
                >
                  Open Full Presentation Board
                </button>
              </div>
            </div>

            <div className="xl:col-span-5 border border-[#DCDCD7] bg-white flex flex-col">
              <div className="relative w-full aspect-[3/2] overflow-hidden bg-[#EAEAE6]">
                <FadeInImage
                  src={MAP_BOARD_IMAGE_PATH}
                  alt="Full Studio Ark Forma Strategic Location Analysis Presentation Sheet"
                  fallbackTitle="Presentation Board Preview"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-4 py-3 bg-[#F7F7F5] border-t border-[#DCDCD7] grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-[#6E6E6A] block">Primary Zone</span>
                  <span className="font-mono tabular-nums font-semibold text-[#1D1D1B]">
                    {activeEntry.site.primaryCatchmentPop.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[#6E6E6A] block">Secondary Zone</span>
                  <span className="font-mono tabular-nums font-semibold text-[#1D1D1B]">
                    {activeEntry.site.secondaryCatchmentPop.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-[#6E6E6A] block">Upcoming Metro</span>
                  <span className="font-semibold text-[#1D1D1B]">
                    {activeEntry.site.upcomingMetro ? 'Confirmed' : 'Planned'}
                  </span>
                </div>
              </div>
              <div className="px-4 py-2.5 bg-white border-t border-[#DCDCD7] flex items-center justify-between text-xs text-[#52524E] mt-auto">
                <span>SAF-01 Architectural Presentation Board</span>
                <button
                  type="button"
                  onClick={onOpenExport}
                  className="font-semibold text-[#1D1D1B] hover:underline"
                >
                  Inspect Full Sheet
                </button>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="border border-[#DCDCD7] overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F2F2EF] border-b border-[#DCDCD7] text-[11px] font-semibold uppercase tracking-wider text-[#52524E]">
                  <th className="py-3 px-4">Candidate Site</th>
                  <th className="py-3 px-4 text-right">Road Access</th>
                  <th className="py-3 px-4 text-right">Metro Link</th>
                  <th className="py-3 px-4 text-right">Primary Catchment</th>
                  <th className="py-3 px-4 text-right">Infra Growth</th>
                  <th className="py-3 px-4 text-right">Composite Index</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E7E7E3] text-sm">
                {scoredSites.map(({ site, score }) => {
                  const selected = site.id === activeEntry.site.id;
                  return (
                    <tr
                      key={site.id}
                      className={selected ? 'bg-[#F2F2EF]' : 'hover:bg-[#FAFAFA]'}
                    >
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => setFocusedSiteId(site.id)}
                          className="text-left font-semibold text-[#1D1D1B] hover:underline"
                        >
                          {site.name}
                        </button>
                        <div className="text-xs text-[#6E6E6A]">{site.corridor}</div>
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-xs">
                        {site.roadAccessKm.toFixed(1)} km
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-xs">
                        {site.metroDistanceKm.toFixed(1)} km
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-xs">
                        {site.primaryCatchmentPop.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right text-xs font-medium">
                        {site.infrastructureGrowth}
                      </td>
                      <td className="py-3 px-4 text-right font-mono tabular-nums text-xs font-bold text-[#1D1D1B]">
                        {score.totalScore} / 100
                      </td>
                    </tr>
                  );
                })}
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
