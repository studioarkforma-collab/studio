import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export type ScreenId = 'overview' | 'connectivity' | 'catchment' | 'comparison';

interface HeaderProps {
  activeScreen: ScreenId;
  onSelectScreen: (screen: ScreenId) => void;
  onOpenExport: () => void;
}

const NAV_ITEMS: { id: ScreenId; label: string }[] = [
  { id: 'overview', label: 'Site Map' },
  { id: 'connectivity', label: 'Connectivity' },
  { id: 'catchment', label: 'Catchment' },
  { id: 'comparison', label: 'Comparison' }
];

export function Header({ activeScreen, onSelectScreen, onOpenExport }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: ScreenId) => {
    onSelectScreen(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 bg-[#F4F4F2]/95 backdrop-blur-sm border-b border-[#D8D8D4] no-print">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => handleNavClick('overview')}
          className="text-left text-base sm:text-lg tracking-[0.12em] text-[#1D1D1B] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#262624]"
        >
          <span className="font-light">STUDIO </span>
          <span className="font-bold">ARK</span>
          <span className="font-light"> FORMA</span>
        </button>

        {/* Zone 2: 4 Clean Single-Line Navigation Links */}
        <nav aria-label="Primary Views" className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`relative py-1.5 text-sm font-medium transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#262624] ${
                  isActive
                    ? 'text-[#1D1D1B]'
                    : 'text-[#6E6E6A] hover:text-[#1D1D1B]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute left-0 right-0 -bottom-[1px] h-[2px] bg-[#1D1D1B]"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action + Mobile Menu Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenExport}
            className="px-4 py-2 text-xs font-semibold tracking-wide bg-[#262624] text-white hover:bg-[#141413] transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#262624]"
          >
            Export Brief
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            className="md:hidden p-2 text-[#1D1D1B] border border-[#D4D4D0] bg-white hover:bg-[#ECECE9]"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-[#D8D8D4] bg-[#F4F4F2] px-4 py-2 flex flex-col gap-1"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeScreen === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNavClick(item.id)}
                aria-current={isActive ? 'page' : undefined}
                className={`text-left px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#262624] text-white'
                    : 'text-[#444440] hover:bg-[#E7E7E3]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      )}
    </header>
  );
}
