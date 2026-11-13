/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import type { LandmarkCategory } from './data/siteData';
import { ExportBriefModal } from './components/ExportBriefModal';
import { Header, type ScreenId } from './components/Header';
import { PresentationBanner } from './components/PresentationBanner';
import { StrategicFooterStrip } from './components/StrategicFooterStrip';
import { CatchmentScreen } from './components/screens/CatchmentScreen';
import { ComparisonScreen } from './components/screens/ComparisonScreen';
import { ConnectivityScreen } from './components/screens/ConnectivityScreen';
import { SiteMapScreen } from './components/screens/SiteMapScreen';

export default function App() {
  const [activeScreen, setActiveScreen] = useState<ScreenId>('overview');
  const [selectedLandmarkId, setSelectedLandmarkId] = useState<string>('business-site');
  const [activeCategory, setActiveCategory] = useState<LandmarkCategory | 'all'>('all');
  const [exportOpen, setExportOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#F2F2F0] text-[#1D1D1B]">
      <Header
        activeScreen={activeScreen}
        onSelectScreen={setActiveScreen}
        onOpenExport={() => setExportOpen(true)}
      />

      <main className="flex-1">
        <PresentationBanner />

        {activeScreen === 'overview' && (
          <SiteMapScreen
            selectedLandmarkId={selectedLandmarkId}
            onSelectLandmark={setSelectedLandmarkId}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            onNavigateScreen={setActiveScreen}
          />
        )}

        {activeScreen === 'connectivity' && (
          <ConnectivityScreen
            selectedLandmarkId={selectedLandmarkId}
            onSelectLandmark={setSelectedLandmarkId}
          />
        )}

        {activeScreen === 'catchment' && (
          <CatchmentScreen
            selectedLandmarkId={selectedLandmarkId}
            onSelectLandmark={setSelectedLandmarkId}
          />
        )}

        {activeScreen === 'comparison' && (
          <ComparisonScreen
            selectedLandmarkId={selectedLandmarkId}
            onSelectLandmark={setSelectedLandmarkId}
            onOpenExport={() => setExportOpen(true)}
          />
        )}
      </main>

      <StrategicFooterStrip />

      <ExportBriefModal
        isOpen={exportOpen}
        onClose={() => setExportOpen(false)}
      />
    </div>
  );
}
