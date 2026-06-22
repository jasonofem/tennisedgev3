export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background hacker grid */}
      <div className="absolute inset-0 data-grid opacity-30" />
      
      <div className="relative z-10 max-w-xl text-center">
        <div className="inline-block mb-6 px-4 py-1 border border-cyan-400/30 text-cyan-400 text-xs font-mono tracking-[3px] rounded">
          TENNIS EDGE v3 • 2026
        </div>

        <div className="font-mono text-[92px] leading-[0.82] font-black tracking-[-6.5px]">
          <span className="text-white">TENNIS</span><br />
          <span className="text-cyan-400">EDGE</span>
        </div>

        <div className="mt-3 text-2xl font-mono text-cyan-400 tracking-tight">
          PRECISION • DISCIPLINE • EDGE
        </div>

        <p className="mt-6 text-lg text-white/60 max-w-md mx-auto">
          Only 3 high-value underdog bets per day.<br />
          Hacker-grade expected value engine. Real odds.
        </p>

        <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
          <a 
            href="/login" 
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-black font-mono font-semibold text-base tracking-wider rounded-xl hover:bg-cyan-400 hover:text-black transition-all"
          >
            ACCESS PLATFORM
          </a>
          <a 
            href="#features" 
            className="inline-flex items-center justify-center px-8 py-4 border border-white/20 hover:bg-white/5 font-mono text-sm rounded-xl transition"
          >
            HOW IT WORKS
          </a>
        </div>

        <div className="mt-8 text-[10px] text-white/30 font-mono tracking-widest">
          POWERED BY LIVE ODDS API • STRICTLY 3 BETS MAX
        </div>
      </div>

      <div id="features" className="mt-24 max-w-3xl text-center text-xs font-mono text-white/40">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10">
          <div className="bg-[#0a0a0a] p-5">
            <div className="text-cyan-400 mb-1">01</div>
            <div className="font-medium text-white">REAL-TIME ODDS</div>
            <div className="mt-1">Live bookmaker data from Pinnacle, Bet365 &amp; others</div>
          </div>
          <div className="bg-[#0a0a0a] p-5">
            <div className="text-cyan-400 mb-1">02</div>
            <div className="font-medium text-white">EV ENGINE</div>
            <div className="mt-1">Only shows picks with +EV &gt; 4%. Max 3 per day.</div>
          </div>
          <div className="bg-[#0a0a0a] p-5">
            <div className="text-cyan-400 mb-1">03</div>
            <div className="font-medium text-white">ACTIVE JOURNAL</div>
            <div className="mt-1">Log, track results, calculate real P/L. Discipline built in.</div>
          </div>
        </div>
      </div>
    </main>
  );
}
