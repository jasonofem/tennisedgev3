"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      localStorage.setItem("tennisedge_user", JSON.stringify({
        email,
        name: email.split("@")[0].toUpperCase() || "OPERATOR",
        loggedInAt: new Date().toISOString()
      }));
      router.push("/dashboard");
    }, 650);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-6 relative">
      <div className="absolute inset-0 data-grid opacity-20" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="inline text-[13px] tracking-[4px] text-cyan-400 font-mono border border-cyan-400/30 px-4 py-1 rounded">v3</div>
          <div className="mt-4 font-mono text-6xl tracking-[-2px]">
            TENNIS<span className="text-cyan-400">EDGE</span>
          </div>
          <div className="text-cyan-400/60 text-sm mt-1 font-mono">PRECISION • DISCIPLINE • EDGE</div>
        </div>

        <div className="terminal p-8 rounded-2xl border border-cyan-400/20">
          <div className="font-mono text-xs text-cyan-400 mb-6 tracking-[2px]">SECURE ACCESS • DEMO MODE</div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <div className="text-xs font-mono text-white/50 mb-1.5">OPERATOR EMAIL</div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@edge.ai"
                required
                className="w-full bg-black border border-white/20 focus:border-cyan-400 text-white px-4 py-3 rounded-xl font-mono placeholder:text-white/30 outline-none"
              />
            </div>

            <div>
              <div className="text-xs font-mono text-white/50 mb-1.5">ACCESS CODE</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-black border border-white/20 focus:border-cyan-400 text-white px-4 py-3 rounded-xl font-mono placeholder:text-white/30 outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-white text-black py-3.5 font-mono font-semibold tracking-wider rounded-xl hover:bg-cyan-400 transition disabled:opacity-60"
            >
              {loading ? "AUTHENTICATING..." : "ENTER TERMINAL"}
            </button>
          </form>

          <div className="text-center text-[10px] text-white/30 mt-6 font-mono">
            ANY CREDENTIALS ACCEPTED • REAL DATA ENABLED
          </div>
        </div>

        <div className="text-center text-[10px] text-white/30 mt-8 font-mono tracking-widest">
          MAX 3 BETS • ONLY HIGH EV OPPORTUNITIES
        </div>
      </div>
    </div>
  );
}
