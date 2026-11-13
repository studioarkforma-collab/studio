export function PresentationBanner() {
  return (
    <section
      aria-label="Studio Ark Forma Project Identity"
      className="bg-[#EFEFED] border-b border-[#D8D8D4]"
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-4 lg:py-5 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Architectural Sheet & Discipline Lockup */}
        <div className="flex items-center gap-5 shrink-0">
          <div>
            <div className="text-xs font-bold tracking-[0.18em] text-[#1D1D1B] uppercase leading-none">
              Sheet SAF-01 · Strategic Analysis
            </div>
            <p className="mt-1.5 text-[10px] sm:text-[11px] font-medium tracking-[0.2em] text-[#5E5E5A] uppercase">
              Architecture · Planning · Visualization
            </p>
          </div>
          <div className="hidden lg:block h-10 w-px bg-[#9A9A95]" aria-hidden="true" />
        </div>

        {/* Central Architectural Statement */}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl xl:text-[28px] font-bold tracking-[0.015em] leading-[1.12] uppercase text-balance">
            <span className="block text-[#262624]">Right Business. Right Location.</span>
            <span className="block text-[#7A7A75]">Better Opportunities.</span>
          </h1>
        </div>

        {/* Editorial Italic Motto */}
        <div className="lg:text-right shrink-0 lg:max-w-[270px]">
          <p className="font-serif italic text-sm sm:text-[15px] leading-snug text-[#2D2D2A] border-b border-[#B8B8B2] pb-1.5 inline-block">
            A strategic location today,
            <br className="hidden lg:inline" /> a stronger business tomorrow.
          </p>
        </div>
      </div>
    </section>
  );
}
