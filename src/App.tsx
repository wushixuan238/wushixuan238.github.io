import { Minus, Square, X } from 'lucide-react'

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 font-body bg-[#000000]">
      {/* THE MONOLITH WINDOW */}
      <main className="relative w-full max-w-5xl aspect-[16/10] bg-surface-container/85 backdrop-blur-md monolith-border flex flex-col">
        {/* PRECISION CORNER DETAILS */}
        <div className="corner-detail corner-tl"></div>
        <div className="corner-detail corner-tr"></div>
        <div className="corner-detail corner-bl"></div>
        <div className="corner-detail corner-br"></div>

        {/* SYSTEM TOP BAR */}
        <header className="bg-neutral-900/85 backdrop-blur-md text-emerald-400 font-headline tracking-tighter uppercase text-xs border-b border-neutral-700/50 flex justify-between items-center h-8 px-4 w-full z-10 shrink-0">
          <div className="flex items-center gap-4">
            <span className="font-mono text-emerald-400 font-bold tracking-[0.2em]">SYSTEM: ACTIVE</span>
            <span className="text-neutral-500 font-mono">CORE_TERMINAL_V1.0.4</span>
          </div>
          <div className="flex gap-4">
            <Minus size={14} className="cursor-crosshair active:scale-95 text-neutral-500 hover:text-emerald-300 transition-colors duration-150" />
            <Square size={14} className="cursor-crosshair active:scale-95 text-neutral-500 hover:text-emerald-300 transition-colors duration-150" />
            <X size={14} className="cursor-crosshair active:scale-95 text-neutral-500 hover:text-emerald-300 transition-colors duration-150" />
          </div>
        </header>

        {/* MAIN CONTENT CANVAS */}
        <div className="flex flex-1 overflow-hidden">
          {/* LEFT PANEL: IDENTITY */}
          <section className="w-1/3 border-r border-outline-variant/30 p-8 flex flex-col gap-6 overflow-y-auto">
            {/* PROFILE HEADSHOT */}
            <div className="relative w-full aspect-square grayscale border border-outline-variant/50 group shrink-0">
              <img 
                alt="Eli Van Drick" 
                className="object-cover w-full h-full opacity-80 group-hover:opacity-100 transition-opacity" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA__TvALFzEtUWe-P3dYuR-U8bGlmLyS6lyxuxJulxirp_JbOR0KOTPTPqEf9AIP697tWWCYuhCPEX1xZXixoUukmiP_69Qo9gPw7liNTkoiTsGnu-Z_dTFHH98dO2SXYzeVDN9PEkXxhjyPNsCdKtHYLecBxfVKG4zug1HlJV9M7lIXowT7HnhVZUNyOUU1T5WtFlkyzR0ATf_ilqqZWqh1b0veNAZnY8VV2si3_ywSg449a9gIfY03l_0VqzCX_C1nUfgCOwMR-U"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <h1 className="text-on-surface font-bold text-xl leading-none">ELI VAN DRICK</h1>
                <p className="text-primary text-[10px] tracking-widest mt-1 font-mono uppercase">Principal Architect</p>
              </div>
            </div>

            {/* KEY-VALUE PAIRS */}
            <div className="space-y-1 font-mono text-[11px] shrink-0">
              <div className="flex justify-between border-b border-outline-variant/10 py-1">
                <span className="text-on-surface-variant">KERNEL</span>
                <span className="text-on-surface">VON_NEUMANN_OS</span>
              </div>
              <div className="flex justify-between border-b border-outline-variant/10 py-1">
                <span className="text-on-surface-variant">NODE_ID</span>
                <span className="text-on-surface">EVD-992-X</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-on-surface-variant">STATUS</span>
                <div className="flex items-center gap-2">
                  <span className="text-primary-container">OPERATIONAL</span>
                  <span className="w-1.5 h-1.5 bg-primary-container rounded-full shadow-[0_0_8px_#00FFC3]"></span>
                </div>
              </div>
            </div>

            {/* DIRECTORY NAV */}
            <nav className="mt-4 font-mono text-[11px] space-y-4">
              <div>
                <span className="text-neutral-600 block mb-2">$ [cat] profile_metadata.json</span>
                <div className="bg-surface-container-high p-3 text-on-surface-variant leading-relaxed">
                  Specializing in distributed systems and high-precision UI engineering. Architecting the void since 2014.
                </div>
              </div>
              <div>
                <span className="text-neutral-600 block mb-2">$ [ls] active_projects/bin</span>
                <div className="grid grid-cols-2 gap-2 text-primary text-[10px]">
                  <a className="hover:bg-primary-container/10 p-1 border border-primary/20" href="#">NEURAL_NET_V2</a>
                  <a className="hover:bg-primary-container/10 p-1 border border-primary/20" href="#">GLITCH_RENDER</a>
                  <a className="hover:bg-primary-container/10 p-1 border border-primary/20" href="#">MONOLITH_UI</a>
                  <a className="hover:bg-primary-container/10 p-1 border border-primary/20" href="#">VOID_PROTOCOL</a>
                </div>
              </div>
            </nav>
          </section>

          {/* Step 4 (Right Panel) will go here */}
        </div>
        
        {/* Step 5 (Footer) will go here */}
      </main>
    </div>
  )
}

export default App
