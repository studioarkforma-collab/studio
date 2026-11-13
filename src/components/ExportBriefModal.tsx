import { useEffect, useState } from 'react';
import { Check, Copy, Printer, X } from 'lucide-react';
import { MAP_BOARD_IMAGE_PATH } from '../data/siteData';
import { FadeInImage } from './FadeInImage';

interface ExportBriefModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BRIEF_SUMMARY = `STUDIO ARK FORMA — STRATEGIC LOCATION ANALYSIS BRIEF
Site Code: SAF-01 (Central Arterial Junction)
Connectivity: Major Road Access 0.3 km | Metro Station 1.2 km | Bus Terminal 2.0 km | Airport 18 km
Surrounding Amenities: Hospitals 1.8 km | Schools 2.0 km | Shopping & Retail 1.5 km | Business Hub 3.0 km
Growth Potential: Upcoming Metro Line (Yes) | New Commercial Hub (2 km) | Infrastructure Growth (High)
Catchment Area: Primary Zone (1–3 km) | Secondary Zone (3–5 km)`;

export function ExportBriefModal({ isOpen, onClose }: ExportBriefModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(BRIEF_SUMMARY);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="export-modal-title"
      className="fixed inset-0 z-50 bg-black/65 flex items-center justify-center p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white border border-[#262624] max-w-5xl w-full max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="px-5 py-4 bg-[#EFEFED] border-b border-[#D8D8D4] flex items-center justify-between gap-4">
          <div>
            <h2 id="export-modal-title" className="text-base font-bold text-[#1D1D1B]">
              Architectural Presentation Board · SAF-01
            </h2>
            <p className="text-xs text-[#52524E]">
              Studio Ark Forma · Right Business. Right Location. Better Opportunities.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close presentation board preview"
            className="p-2 text-[#1D1D1B] hover:bg-[#DFDFDB] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 bg-[#E5E5E1]">
          <div className="bg-white border border-[#C8C8C2] overflow-hidden">
            <FadeInImage
              src={MAP_BOARD_IMAGE_PATH}
              alt="Complete Studio Ark Forma Strategic Location Analysis Presentation Board"
              fallbackTitle="Studio Ark Forma Presentation Board"
              className="w-full h-auto block"
            />
          </div>
        </div>

        <div className="px-5 py-4 bg-white border-t border-[#D8D8D4] flex flex-wrap items-center justify-between gap-3">
          <p className="text-xs text-[#52524E]">
            Includes isometric site layout, key connectivity distances, catchment zones, and legend.
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium border border-[#262624] text-[#1D1D1B] hover:bg-[#F2F2EF] transition-colors whitespace-nowrap shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Brief Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold bg-[#262624] text-white hover:bg-[#141413] transition-colors whitespace-nowrap shrink-0"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Print Sheet</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
