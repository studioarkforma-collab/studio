export type LandmarkCategory = 'site' | 'transit' | 'amenities' | 'commercial' | 'environment';

export interface LandmarkNode {
  id: string;
  name: string;
  category: LandmarkCategory;
  distanceLabel: string;
  distanceKm: number;
  /** Coordinates within the cropped isometric map viewport (0..100%) */
  xPct: number;
  yPct: number;
  corridor: string;
  strategicRole: string;
  architecturalNote: string;
}

export interface InsightMetric {
  id: string;
  label: string;
  value: string;
  landmarkId?: string;
}

export interface InsightSection {
  id: string;
  title: string;
  icon: 'connectivity' | 'amenities' | 'growth' | 'catchment';
  items: InsightMetric[];
}

export interface StrategicPillar {
  id: string;
  title: string;
  subtitle: string;
  icon: 'location' | 'accessibility' | 'growth' | 'ecosystem';
}

export interface CandidateSite {
  id: string;
  name: string;
  code: string;
  corridor: string;
  plotAreaSqm: number;
  zoning: string;
  roadAccessKm: number;
  metroDistanceKm: number;
  hospitalDistanceKm: number;
  retailDistanceKm: number;
  upcomingMetro: boolean;
  infrastructureGrowth: 'High' | 'Moderate';
  primaryCatchmentPop: number;
  secondaryCatchmentPop: number;
  frontageMeters: number;
  notes: string;
}

export const MAP_BOARD_IMAGE_PATH = '/assets/aistudio/Strategic_Location_Analysis_Map_cb2b556d.png';

export const LANDMARK_NODES: LandmarkNode[] = [
  {
    id: 'business-site',
    name: 'Business Site',
    category: 'site',
    distanceLabel: '0.0 km',
    distanceKm: 0,
    xPct: 54.4,
    yPct: 48.8,
    corridor: 'Central Arterial Junction',
    strategicRole: 'Primary Development Parcel',
    architecturalNote: 'Corner-anchored commercial plot directly bordering the primary arterial highway and adjacent green belt buffer.'
  },
  {
    id: 'petrol-pump',
    name: 'Petrol Pump',
    category: 'commercial',
    distanceLabel: '0.5 km',
    distanceKm: 0.5,
    xPct: 72.5,
    yPct: 58.0,
    corridor: 'East Service Spine',
    strategicRole: 'Fleet & Commuter Service Node',
    architecturalNote: 'Immediate refueling and EV-ready service access along the secondary connector road.'
  },
  {
    id: 'auto-showroom',
    name: 'Auto Showroom',
    category: 'commercial',
    distanceLabel: '0.7 km',
    distanceKm: 0.7,
    xPct: 40.5,
    yPct: 64.5,
    corridor: 'South Boulevard Frontage',
    strategicRole: 'High-Visibility Retail Anchor',
    architecturalNote: 'Demonstrates established showroom footfall and high-value commercial frontage along the main avenue.'
  },
  {
    id: 'metro-station',
    name: 'Metro Station',
    category: 'transit',
    distanceLabel: '1.2 km',
    distanceKm: 1.2,
    xPct: 80.8,
    yPct: 40.0,
    corridor: 'Elevated Metro Corridor',
    strategicRole: 'Rapid Mass Transit Hub',
    architecturalNote: 'Walkable or 4-minute shuttle link connecting the site to the wider metropolitan rail network.'
  },
  {
    id: 'lifestyle-mall',
    name: 'Lifestyle Mall',
    category: 'amenities',
    distanceLabel: '1.5 km',
    distanceKm: 1.5,
    xPct: 21.7,
    yPct: 45.5,
    corridor: 'West Retail District',
    strategicRole: 'Consumer & Dining Destination',
    architecturalNote: 'Captures weekend and evening destination traffic within the 1–3 km primary catchment ring.'
  },
  {
    id: 'city-hospital',
    name: 'City Hospital',
    category: 'amenities',
    distanceLabel: '1.8 km',
    distanceKm: 1.8,
    xPct: 70.6,
    yPct: 24.5,
    corridor: 'North Civic Avenue',
    strategicRole: 'Regional Healthcare Anchor',
    architecturalNote: 'Provides institutional daytime population and emergency service resilience under 6 minutes by road.'
  },
  {
    id: 'university',
    name: 'University',
    category: 'amenities',
    distanceLabel: '2.5 km',
    distanceKm: 2.5,
    xPct: 41.6,
    yPct: 23.0,
    corridor: 'Academic Precinct',
    strategicRole: 'Talent & Research Pipeline',
    architecturalNote: 'Generates continuous student, faculty, and research-sector demand within the primary catchment zone.'
  },
  {
    id: 'industrial-zone',
    name: 'Industrial Zone',
    category: 'commercial',
    distanceLabel: '3.0 km',
    distanceKm: 3.0,
    xPct: 88.5,
    yPct: 74.5,
    corridor: 'Southeast Logistics Belt',
    strategicRole: 'B2B Supply & Enterprise Hub',
    architecturalNote: 'Positions B2B partners, warehousing, and vendor operations within a 10-minute freight window.'
  },
  {
    id: 'green-belt',
    name: 'Green Belt',
    category: 'environment',
    distanceLabel: 'Next to Site',
    distanceKm: 0.1,
    xPct: 24.1,
    yPct: 82.0,
    corridor: 'Riverside Ecological Buffer',
    strategicRole: 'Microclimate & Amenity Frontage',
    architecturalNote: 'Adjacent linear parkland buffers urban noise, enhances daylighting, and supports pedestrian greenways.'
  }
];

export const KEY_INSIGHT_SECTIONS: InsightSection[] = [
  {
    id: 'connectivity',
    title: 'Connectivity',
    icon: 'connectivity',
    items: [
      { id: 'road-access', label: 'Major Road Access', value: '0.3 km', landmarkId: 'business-site' },
      { id: 'metro-station', label: 'Metro Station', value: '1.2 km', landmarkId: 'metro-station' },
      { id: 'bus-terminal', label: 'Bus Terminal', value: '2.0 km', landmarkId: 'metro-station' },
      { id: 'airport', label: 'Airport', value: '18 km' }
    ]
  },
  {
    id: 'amenities',
    title: 'Surrounding Amenities',
    icon: 'amenities',
    items: [
      { id: 'hospitals', label: 'Hospitals', value: '1.8 km', landmarkId: 'city-hospital' },
      { id: 'schools', label: 'Schools', value: '2.0 km', landmarkId: 'university' },
      { id: 'shopping', label: 'Shopping & Retail', value: '1.5 km', landmarkId: 'lifestyle-mall' },
      { id: 'business-hub', label: 'Business Hub', value: '3.0 km', landmarkId: 'industrial-zone' }
    ]
  },
  {
    id: 'growth',
    title: 'Growth Potential',
    icon: 'growth',
    items: [
      { id: 'upcoming-metro', label: 'Upcoming Metro Line', value: 'Yes', landmarkId: 'metro-station' },
      { id: 'new-hub', label: 'New Commercial Hub', value: '2 km', landmarkId: 'industrial-zone' },
      { id: 'infra-growth', label: 'Infrastructure Growth', value: 'High', landmarkId: 'business-site' }
    ]
  },
  {
    id: 'catchment',
    title: 'Catchment Area',
    icon: 'catchment',
    items: [
      { id: 'primary-zone', label: 'Primary Zone', value: '1–3 km', landmarkId: 'business-site' },
      { id: 'secondary-zone', label: 'Secondary Zone', value: '3–5 km', landmarkId: 'industrial-zone' }
    ]
  }
];

export const STRATEGIC_PILLARS: StrategicPillar[] = [
  {
    id: 'strategic-location',
    title: 'Strategic Location',
    subtitle: 'In the heart of a growing city',
    icon: 'location'
  },
  {
    id: 'strong-accessibility',
    title: 'Strong Accessibility',
    subtitle: 'Seamless reach for customers & stakeholders',
    icon: 'accessibility'
  },
  {
    id: 'high-growth',
    title: 'High Growth Potential',
    subtitle: 'Backed by urban development',
    icon: 'growth'
  },
  {
    id: 'thriving-ecosystem',
    title: 'Thriving Business Ecosystem',
    subtitle: 'Surrounded by complementary businesses and services',
    icon: 'ecosystem'
  }
];

export const CANDIDATE_SITES: CandidateSite[] = [
  {
    id: 'site-a',
    name: 'Central Arterial Plot',
    code: 'SAF-01 · FEATURED',
    corridor: 'Arterial Junction & Green Belt',
    plotAreaSqm: 14200,
    zoning: 'Mixed-Use Commercial (MU-3)',
    roadAccessKm: 0.3,
    metroDistanceKm: 1.2,
    hospitalDistanceKm: 1.8,
    retailDistanceKm: 1.5,
    upcomingMetro: true,
    infrastructureGrowth: 'High',
    primaryCatchmentPop: 148000,
    secondaryCatchmentPop: 392000,
    frontageMeters: 118,
    notes: 'Balanced highway visibility, 1.2 km metro link, adjacent green belt buffer, and strong 1–3 km residential/academic density.'
  },
  {
    id: 'site-b',
    name: 'East Commercial Corridor',
    code: 'SAF-02 · ALT',
    corridor: 'East Ring Expressway',
    plotAreaSqm: 11800,
    zoning: 'Commercial Retail (C-2)',
    roadAccessKm: 0.2,
    metroDistanceKm: 2.4,
    hospitalDistanceKm: 2.9,
    retailDistanceKm: 1.1,
    upcomingMetro: true,
    infrastructureGrowth: 'High',
    primaryCatchmentPop: 121000,
    secondaryCatchmentPop: 334000,
    frontageMeters: 94,
    notes: 'Slightly closer highway ramp access (0.2 km) and retail cluster, but double the distance to existing metro transit.'
  },
  {
    id: 'site-c',
    name: 'North Logistics & Tech Hub',
    code: 'SAF-03 · ALT',
    corridor: 'Northern Industrial Bypass',
    plotAreaSqm: 19500,
    zoning: 'Business Park (BP-1)',
    roadAccessKm: 0.6,
    metroDistanceKm: 3.1,
    hospitalDistanceKm: 3.6,
    retailDistanceKm: 2.8,
    upcomingMetro: false,
    infrastructureGrowth: 'Moderate',
    primaryCatchmentPop: 84000,
    secondaryCatchmentPop: 245000,
    frontageMeters: 142,
    notes: 'Largest parcel footprint for warehouse or campus layouts, with longer transit and amenity travel times.'
  }
];
