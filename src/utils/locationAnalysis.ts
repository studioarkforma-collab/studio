import type { CandidateSite, LandmarkCategory, LandmarkNode } from '../data/siteData';

export type TransportMode = 'drive' | 'metro' | 'walk';

export interface CatchmentMetrics {
  radiusKm: number;
  zoneLabel: 'Primary Zone' | 'Secondary Zone' | 'Extended Metropolitan';
  estimatedPopulation: number;
  households: number;
  dailyTransitVolume: number;
  activeLandmarksCount: number;
}

export interface SiteFeasibilityBreakdown {
  connectivityScore: number;
  amenitiesScore: number;
  growthScore: number;
  totalScore: number;
  tier: 'Tier A · Prime' | 'Tier B · Strong' | 'Tier C · Viable';
}

export function filterLandmarks(
  landmarks: LandmarkNode[],
  category: LandmarkCategory | 'all',
  searchQuery = ''
): LandmarkNode[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return landmarks.filter((node) => {
    const matchesCategory = category === 'all' || node.category === category;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      node.name.toLowerCase().includes(normalizedQuery) ||
      node.corridor.toLowerCase().includes(normalizedQuery) ||
      node.strategicRole.toLowerCase().includes(normalizedQuery)
    );
  });
}

export function estimateTravelMinutes(
  distanceKm: number,
  mode: TransportMode,
  isPeakHour: boolean
): number {
  if (distanceKm <= 0) return 0;

  // Average urban speed in km/h by mode
  let speedKmh: number;
  if (mode === 'walk') {
    speedKmh = 4.8;
  } else if (mode === 'metro') {
    speedKmh = isPeakHour ? 34 : 36;
  } else {
    speedKmh = isPeakHour ? 21 : 32;
  }

  const overheadMin = mode === 'metro' ? 3 : mode === 'drive' ? 1 : 0;
  return Math.max(1, Math.round((distanceKm / speedKmh) * 60 + overheadMin));
}

export function calculateCatchmentMetrics(
  radiusKm: number,
  landmarks: LandmarkNode[]
): CatchmentMetrics {
  const clampedRadius = Math.max(0.5, Math.min(10, radiusKm));
  const zoneLabel: CatchmentMetrics['zoneLabel'] =
    clampedRadius <= 3
      ? 'Primary Zone'
      : clampedRadius <= 5
        ? 'Secondary Zone'
        : 'Extended Metropolitan';

  // Urban ring density curve calibrated to 148k at 3km and 392k at 5km
  const estimatedPopulation = Math.round(16400 * Math.pow(clampedRadius, 1.98));
  const households = Math.round(estimatedPopulation / 3.15);
  const dailyTransitVolume = Math.round(estimatedPopulation * 0.24);
  const activeLandmarksCount = landmarks.filter((l) => l.distanceKm <= clampedRadius).length;

  return {
    radiusKm: Number(clampedRadius.toFixed(1)),
    zoneLabel,
    estimatedPopulation,
    households,
    dailyTransitVolume,
    activeLandmarksCount
  };
}

export function scoreSiteFeasibility(site: CandidateSite): SiteFeasibilityBreakdown {
  // Lower distance = higher score (capped within 0..100)
  const roadPoints = Math.max(0, 40 - site.roadAccessKm * 25);
  const metroPoints = Math.max(0, 60 - site.metroDistanceKm * 12);
  const connectivityScore = Math.round(Math.min(100, roadPoints + metroPoints));

  const hospitalPoints = Math.max(0, 50 - site.hospitalDistanceKm * 9);
  const retailPoints = Math.max(0, 50 - site.retailDistanceKm * 10);
  const amenitiesScore = Math.round(Math.min(100, hospitalPoints + retailPoints));

  const metroBonus = site.upcomingMetro ? 55 : 25;
  const infraBonus = site.infrastructureGrowth === 'High' ? 45 : 25;
  const growthScore = Math.round(Math.min(100, metroBonus + infraBonus));

  const totalScore = Math.round(
    connectivityScore * 0.4 + amenitiesScore * 0.3 + growthScore * 0.3
  );

  const tier: SiteFeasibilityBreakdown['tier'] =
    totalScore >= 82 ? 'Tier A · Prime' : totalScore >= 68 ? 'Tier B · Strong' : 'Tier C · Viable';

  return {
    connectivityScore,
    amenitiesScore,
    growthScore,
    totalScore,
    tier
  };
}
