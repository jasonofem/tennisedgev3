"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Pick {
  id: number;
  match: string;
  tournament: string;
  underdog: string;
  opponent: string;
  odds: string;
  confidence: number;
  value: number;
  reason: string;
  time: string;
  surface: string;
  ev: number;
  impliedProb: number;
}

interface JournalEntry {
  id: number;
  pick: Pick;
  loggedAt: string;
  stake: number;
  result?: "win" | "loss" | "pending";
  profit?: number;
}

interface User {
  email: string;
  name: string;
  loggedInAt: string;
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [picks, setPicks] = useState<Pick[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [showJournal, setShowJournal] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(100);
  const router = useRouter();

  // Load journal from localStorage
  useEffect(() => {
    const storedJournal = localStorage.getItem("tennisedge_journal");
    if (storedJournal) {
      setJournal(JSON.parse(storedJournal));
    }
  }, []);

  const saveJournal = (newJournal: JournalEntry[]) => {
    localStorage.setItem("tennisedge_journal", JSON.stringify(newJournal));
    setJournal(newJournal);
  };

  const fetchPicks = async (showLoading = false) => {
    if (showLoading) setIsRefreshing(true);

    try {
      const res = await fetch("/api/picks", { cache: "no-store" });
      const data = await res.json();

      setPicks(data.picks || []);
      const updateTime = new Date(data.lastUpdated || new Date());
      setLastUpdated(updateTime.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    } catch (err) {
      console.error("Failed to fetch picks");
    } finally {
      if (showLoading) setIsRefreshing(false);
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("tennisedge_user");
    if (!storedUser) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
    fetchPicks();
  }, [router]);

  const refreshPicks = () => fetchPicks(true);

  const handleLogout = () => {
    localStorage.removeItem("tennisedge_user");
    router.push("/");
  };

  // === JOURNAL FUNCTIONS ===
  const logToJournal = (pick: Pick) => {
    const newEntry: JournalEntry = {
      id: Date.now(),
      pick,
      loggedAt: new Date().toISOString(),
      stake: stakeAmount,
      result: "pending",
    };

    const updated = [newEntry, ...journal].slice(0, 50); // keep last 50
    saveJournal(updated);
    
    // Visual feedback
    const btn = document.getElementById(`log-${pick.id}`);
    if (btn) {
      btn.innerHTML = "LOGGED ✓";
      setTimeout(() => {
        if (btn) btn.innerHTML = "LOG TO JOURNAL";
      }, 1400);
    }
  };

  const updateJournalResult = (entryId: number, result: "win" | "loss") => {
    const updated = journal.map(entry => {
      if (entry.id === entryId) {
        const stake = entry.stake;
        const odds = parseFloat(entry.pick.odds);
        const profit = result === "win" 
          ? Math.round(stake * (odds - 1)) 
          : -stake;

        return {
          ...entry,
          result,
          profit
        };
      }
      return entry;
    });
    saveJournal(updated);
  };

  const deleteJournalEntry = (entryId: number) => {
    const updated = journal.filter(e => e.id !== entryId);
    saveJournal(updated);
  };

  // Stats
  const totalValue = picks.reduce((sum, p) => sum + p.value, 0);
  const avgConfidence = picks.length ? Math.round(picks.reduce((sum, p) => sum + p.confidence, 0) / picks.length) : 0;
  const avgEV = picks.length ? (picks.reduce((sum, p) => sum + p.ev, 0) / picks.length).toFixed(1) : "0";

  // Journal stats
  const settled = journal.filter(e => e.result !== "pending");
  const winRate = settled.length > 0 
    ? Math.round((settled.filter(e => e.result === "win").length / settled.length) * 100) 
    : 0;
  const totalProfit = settled.reduce((sum, e) => sum + (e.profit || 0), 0);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] font-mono text-cyan-400">
        LOADING TERMINAL...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white scanline">
      {/* Hacker Navbar */}
      <nav className="border-b border-white/10 bg-black/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <a href="/" className="flex items-center gap-3">
              <div>
                <span className="font-mono text-2xl font-bold tracking-[-1.5px]">TENNIS</span>
                <span className="font-mono text-2xl font-bold tracking-[-1.5px] text-cyan-400">EDGE</span>
              </div>
              <div className="text-[10px] font-mono px-2 py-px border border-cyan-400/50 text-cyan-400 rounded">v3</div>
            </a>
            <div className="text-[10px] px-2 py-0.5 bg-white/5 text-white/50 font-mono rounded">PRO</div>
          </div>

          <div className="flex items-center gap-5 text-xs font-mono">
            <div className="flex items-center gap-2 text-emerald-400">
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              LIVE FEED
            </div>
            
            <button 
              onClick={() => setShowJournal(!showJournal)}
              className="px-4 py-1.5 border border-white/20 hover:bg-white/5 rounded-md transition-all flex items-center gap-2"
            >
              JOURNAL <span className="text-cyan-400">({journal.length})</span>
            </button>

            <div className="text-white/60">|</div>
            
            <div className="text-right">
              <span className="text-white/60">OPERATOR</span><br />
              <span className="font-medium">{user.name}</span>
            </div>
            
            <button 
              onClick={handleLogout}
              className="px-3 py-1.5 border border-red-500/30 hover:bg-red-950/50 text-red-400 rounded text-xs transition-all"
            >
              DISCONNECT
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-16">
        {/* HEADER - Hacker style */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="font-mono text-xs tracking-[4px] text-cyan-400">DISCIPLINED EDGE SYSTEM</div>
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-400/30 to-transparent" />
            </div>
            <h1 className="text-6xl font-black tracking-[-3.5px] font-mono">TODAY'S 3</h1>
            <p className="text-xl text-white/50 mt-1">Maximum 3 high-value underdog opportunities • No exceptions</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="font-mono text-right text-sm">
              <div className="text-white/40">LAST SYNC</div>
              <div className="text-white">{lastUpdated || "—"}</div>
            </div>
            <button 
              onClick={refreshPicks}
              disabled={isRefreshing}
              className="px-6 py-3 border border-cyan-400/60 hover:bg-cyan-400/10 text-sm font-mono rounded-lg transition disabled:opacity-50 flex items-center gap-2"
            >
              {isRefreshing ? "SYNCING..." : "REFRESH FEED"}
            </button>
          </div>
        </div>

        {/* STATS - Cyber Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-8">
          <div className="stat-box p-4 rounded-2xl">
            <div className="text-xs font-mono text-cyan-400/70 tracking-widest">PICKS</div>
            <div className="text-4xl font-semibold tabular-nums mt-1">{picks.length}<span className="text-lg text-white/40">/3</span></div>
          </div>
          <div className="stat-box p-4 rounded-2xl">
            <div className="text-xs font-mono text-cyan-400/70 tracking-widest">AVG CONF</div>
            <div className="text-4xl font-semibold tabular-nums mt-1">{avgConfidence}<span className="text-lg text-white/40">%</span></div>
          </div>
          <div className="stat-box p-4 rounded-2xl">
            <div className="text-xs font-mono text-cyan-400/70 tracking-widest">AVG EV</div>
            <div className="text-4xl font-semibold tabular-nums mt-1">+{avgEV}<span className="text-lg text-white/40">%</span></div>
          </div>
          <div className="stat-box p-4 rounded-2xl">
            <div className="text-xs font-mono text-cyan-400/70 tracking-widest">TOTAL EDGE</div>
            <div className="text-4xl font-semibold tabular-nums mt-1">+{totalValue}<span className="text-lg text-white/40">%</span></div>
          </div>
          <div className="stat-box p-4 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-cyan-400/70 tracking-widest">JOURNAL P/L</div>
              <div className={`text-4xl font-semibold tabular-nums mt-1 ${totalProfit >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {totalProfit >= 0 ? '+' : ''}{totalProfit}
              </div>
            </div>
            <div className="text-xs text-white/50 font-mono">{winRate}% WR • {settled.length} settled</div>
          </div>
        </div>

        {/* PICKS - Main hacker cards */}
        <div className="mb-4 flex items-center justify-between">
          <div className="font-mono text-xs tracking-[3px] text-cyan-400">HIGH-EV UNDERDOGS • FILTERED FOR PROFIT</div>
          <div className="text-xs font-mono text-white/40">POWERED BY LIVE ODDS API</div>
        </div>

        <div className="grid gap-4">
          {picks.length > 0 ? (
            picks.map((pick, index) => (
              <div key={pick.id} className="pick-card bg-[#111] border border-white/10 hover:border-cyan-400/40 rounded-2xl p-6 md:p-7">
                <div className="flex flex-col lg:flex-row lg:items-center gap-y-6 gap-x-8">
                  {/* Match Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="px-3 py-px text-xs font-mono bg-white/5 border border-white/10 rounded">{pick.tournament}</div>
                      <div className="px-3 py-px text-xs font-mono bg-emerald-500/10 text-emerald-400 rounded">{pick.surface}</div>
                      <div className="text-xs text-white/40 font-mono">MATCH {index + 1}</div>
                    </div>

                    <div className="font-mono text-2xl tracking-[-1px] font-medium">
                      <span className="text-cyan-400">{pick.underdog}</span> 
                      <span className="text-white/40 mx-2">vs</span> 
                      {pick.opponent}
                    </div>
                    <div className="text-sm text-white/50 mt-0.5 font-mono">{pick.time} • {pick.tournament}</div>
                  </div>

                  {/* Key Metrics - Hacker numbers */}
                  <div className="flex items-center gap-6 md:gap-9 text-center">
                    <div>
                      <div className="text-[10px] font-mono text-white/40 mb-px">ODDS</div>
                      <div className="font-mono text-4xl font-semibold text-white tabular-nums">{pick.odds}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-white/40 mb-px">CONF</div>
                      <div className="font-mono text-4xl font-semibold text-emerald-400 tabular-nums">{pick.confidence}</div>
                    </div>
                    <div>
                      <div className="text-[10px] font-mono text-white/40 mb-px">EV</div>
                      <div className="font-mono text-4xl font-semibold text-cyan-400 tabular-nums">+{pick.ev}</div>
                    </div>
                  </div>
                </div>

                {/* Reason + Action */}
                <div className="mt-5 pt-5 border-t border-white/10 text-sm text-white/75 leading-relaxed">
                  {pick.reason}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 mt-5 pt-4 border-t border-white/10 text-xs font-mono">
                  <div className="text-white/50">
                    IMPLIED PROB: {pick.impliedProb}% &nbsp;•&nbsp; VALUE: +{pick.value}%
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => logToJournal(pick)}
                      id={`log-${pick.id}`}
                      className="px-5 py-2 border border-cyan-400/50 hover:bg-cyan-400/10 text-cyan-400 rounded-lg transition text-xs font-medium"
                    >
                      LOG TO JOURNAL
                    </button>
                    <button 
                      onClick={() => alert(`Simulated stake: ${stakeAmount} @ ${pick.odds} (demo only)`)}
                      className="px-5 py-2 border border-white/20 hover:bg-white/5 rounded-lg transition text-xs"
                    >
                      SIMULATE BET
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-white/40 font-mono">NO QUALIFYING EDGE TODAY</div>
          )}
        </div>

        {/* DISCIPLINE NOTE */}
        <div className="mt-8 text-center text-xs font-mono text-white/40">
          ONLY THE TOP 3 HIGHEST EV PICKS ARE SHOWN. DISCIPLINE IS THE EDGE.
        </div>

        {/* JOURNAL SECTION - Active & Beautiful */}
        {showJournal && (
          <div className="mt-14">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-mono text-cyan-400 text-sm tracking-widest">OPERATIONS JOURNAL</div>
                <div className="text-3xl font-semibold tracking-tighter">Bet Log</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-xs font-mono bg-white/5 px-4 py-1 rounded border border-white/10">
                  STAKE: <input 
                    type="number" 
                    value={stakeAmount} 
                    onChange={(e) => setStakeAmount(Math.max(10, parseInt(e.target.value) || 100))}
                    className="bg-transparent w-12 text-right font-mono outline-none" 
                  /> units
                </div>
              </div>
            </div>

            {journal.length > 0 ? (
              <div className="terminal rounded-2xl p-1 border border-white/10">
                {journal.map((entry, idx) => (
                  <div key={entry.id} className="journal-entry flex flex-col md:flex-row gap-4 items-start md:items-center justify-between p-5 border-b border-white/10 last:border-none">
                    <div className="flex-1 min-w-0">
                      <div className="font-mono text-lg">{entry.pick.match}</div>
                      <div className="text-xs text-white/40 mt-0.5 font-mono">
                        {new Date(entry.loggedAt).toLocaleString()} • {entry.pick.tournament} • {entry.pick.odds}
                      </div>
                    </div>

                    <div className="flex items-center gap-5 text-sm font-mono">
                      <div>
                        <span className="text-white/40">STAKE</span> <span className="font-semibold">{entry.stake}</span>
                      </div>
                      <div>
                        <span className="text-white/40">EV</span> <span className="text-cyan-400 font-semibold">+{entry.pick.ev}%</span>
                      </div>

                      {entry.result === "pending" ? (
                        <div className="flex gap-2">
                          <button 
                            onClick={() => updateJournalResult(entry.id, "win")}
                            className="px-4 py-1 text-xs bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-400/30 rounded"
                          >
                            WIN
                          </button>
                          <button 
                            onClick={() => updateJournalResult(entry.id, "loss")}
                            className="px-4 py-1 text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-400/30 rounded"
                          >
                            LOSS
                          </button>
                        </div>
                      ) : (
                        <div className={`font-semibold px-3 py-px rounded ${entry.result === 'win' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-red-400/10 text-red-400'}`}>
                          {entry.result?.toUpperCase()} • {entry.profit! >= 0 ? '+' : ''}{entry.profit}
                        </div>
                      )}

                      <button 
                        onClick={() => deleteJournalEntry(entry.id)}
                        className="text-white/30 hover:text-red-400 text-xs px-1"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-white/40 border border-white/10 rounded-2xl font-mono">
                No entries yet. Log your first pick above.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
