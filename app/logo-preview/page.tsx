export default function LogoPreviewPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto px-8 py-16 space-y-20">

        <header>
          <p className="text-yellow-500/60 text-xs tracking-[0.3em] uppercase mb-3">Internal · Logo Concepts</p>
          <h1 className="text-5xl font-light text-white mb-2">Logo Preview</h1>
          <p className="text-white/50">Two new concepts side-by-side with current. View on different backgrounds, sizes, and contexts.</p>
        </header>

        {/* Section: Current logo */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <p className="text-white/40 text-xs tracking-[0.2em] uppercase">Current</p>
            <h2 className="text-2xl text-white mt-1">Crown + Bold Wordmark</h2>
          </div>
          <div className="bg-zinc-900 border border-white/10 rounded p-12 flex justify-center">
            <img src="/logo.svg" alt="Current logo" className="h-24" />
          </div>
        </section>

        {/* Section: Concept B — Wordmark */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <p className="text-yellow-500/60 text-xs tracking-[0.2em] uppercase">Concept B</p>
            <h2 className="text-2xl text-white mt-1">Pure Serif Wordmark · Cartier-style</h2>
            <p className="text-white/50 text-sm mt-2">For website headers, email signatures, business cards, ads.</p>
          </div>

          {/* Hero size */}
          <div className="bg-zinc-900 border border-white/10 rounded p-16 flex justify-center">
            <img src="/concepts/wordmark.svg" alt="Wordmark logo" className="h-32" />
          </div>

          {/* Header size (matching the actual nav height) */}
          <div className="bg-black border border-white/10 rounded">
            <div className="border-b border-white/10 bg-black/80 backdrop-blur-xl">
              <div className="max-w-7xl mx-auto px-6 flex justify-center md:justify-between items-center h-20">
                <img src="/concepts/wordmark.svg" alt="Header logo" className="h-12" />
                <div className="flex items-center space-x-6 text-sm text-white/70">
                  <span>Talent</span>
                  <span className="px-6 py-2 bg-yellow-500 text-black font-bold tracking-wider uppercase text-xs">Book Now</span>
                </div>
              </div>
            </div>
            <div className="p-12 text-center text-white/40 text-sm">↑ How it looks in the actual site nav</div>
          </div>

          {/* On white background */}
          <div className="bg-white border border-white/10 rounded p-12 flex justify-center">
            <img src="/concepts/wordmark.svg" alt="Wordmark on white" className="h-24" style={{ filter: 'invert(0)' }} />
          </div>
        </section>

        {/* Section: Concept A — Monogram */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <p className="text-yellow-500/60 text-xs tracking-[0.2em] uppercase">Concept A</p>
            <h2 className="text-2xl text-white mt-1">IM Monogram · Saint Laurent / Chanel-style</h2>
            <p className="text-white/50 text-sm mt-2">For favicon, social avatars, app icon, watermarks, business card backside.</p>
          </div>

          {/* Sizes grid */}
          <div className="grid grid-cols-4 gap-6">
            <div className="bg-zinc-900 border border-white/10 rounded p-8 flex flex-col items-center">
              <img src="/concepts/monogram.svg" alt="240px" className="w-48 h-48 mb-4" />
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase">Hero · 240px</p>
            </div>
            <div className="bg-zinc-900 border border-white/10 rounded p-8 flex flex-col items-center">
              <img src="/concepts/monogram.svg" alt="120px" className="w-32 h-32 mb-4" />
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase">Medium · 120px</p>
            </div>
            <div className="bg-zinc-900 border border-white/10 rounded p-8 flex flex-col items-center justify-center">
              <img src="/concepts/monogram.svg" alt="64px" className="w-16 h-16 mb-4" />
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase">Avatar · 64px</p>
            </div>
            <div className="bg-zinc-900 border border-white/10 rounded p-8 flex flex-col items-center justify-center">
              <img src="/concepts/monogram.svg" alt="32px" className="w-8 h-8 mb-4" />
              <p className="text-white/40 text-xs tracking-[0.2em] uppercase">Favicon · 32px</p>
            </div>
          </div>

          {/* Social avatar simulation */}
          <div className="bg-zinc-900 border border-white/10 rounded p-12">
            <p className="text-white/40 text-xs tracking-[0.2em] uppercase mb-6">Instagram Avatar Simulation</p>
            <div className="flex items-center space-x-4 max-w-md">
              <img src="/concepts/monogram.svg" alt="IG avatar" className="w-16 h-16 rounded-full ring-2 ring-pink-500" style={{ background: 'black' }} />
              <div>
                <p className="text-white font-semibold">influencemodelsagency</p>
                <p className="text-white/50 text-sm">Influence Models Agency</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Combined lockup */}
        <section className="space-y-6">
          <div className="border-b border-white/10 pb-4">
            <p className="text-yellow-500/60 text-xs tracking-[0.2em] uppercase">Combined Lockup</p>
            <h2 className="text-2xl text-white mt-1">Monogram + Wordmark Together</h2>
            <p className="text-white/50 text-sm mt-2">For full-page hero sections, packaging, formal documents.</p>
          </div>

          <div className="bg-zinc-900 border border-white/10 rounded p-16 flex flex-col items-center space-y-6">
            <img src="/concepts/monogram.svg" alt="Monogram" className="w-32 h-32" />
            <img src="/concepts/wordmark.svg" alt="Wordmark" className="h-20" />
          </div>
        </section>

        <footer className="border-t border-white/10 pt-8 pb-16 text-center text-white/40 text-sm">
          <p>If you like a direction, tell Cascade to deploy it as the real logo.</p>
          <p className="mt-2">Otherwise, describe what to change.</p>
        </footer>

      </div>
    </div>
  );
}
