"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Play, Pause, RotateCcw, Timer, Coffee, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const MODES = [
  { label: "专注", minutes: 25, color: "#f59e0b", icon: <Zap className="w-4 h-4" /> },
  { label: "短休", minutes: 5, color: "#fbbf24", icon: <Coffee className="w-4 h-4" /> },
  { label: "长休", minutes: 15, color: "#d97706", icon: <Timer className="w-4 h-4" /> },
] as const;

type Mode = typeof MODES[number];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export function Pomodoro() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [mode, setMode] = useState<Mode>(MODES[0]);
  const [totalSeconds, setTotalSeconds] = useState(MODES[0].minutes * 60);
  const [remaining, setRemaining] = useState(MODES[0].minutes * 60);
  const [running, setRunning] = useState(false);
  const [finished, setFinished] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Timer logic
  useEffect(() => {
    if (running && remaining > 0) {
      intervalRef.current = setInterval(() => {
        setRemaining((prev) => {
          if (prev <= 1) {
            setRunning(false);
            setFinished(true);
            // Play notification sound
            try {
              const ctx = new AudioContext();
              const osc = ctx.createOscillator();
              const gain = ctx.createGain();
              osc.connect(gain);
              gain.connect(ctx.destination);
              osc.frequency.value = 800;
              gain.gain.value = 0.3;
              osc.start();
              setTimeout(() => { osc.stop(); ctx.close(); }, 300);
              setTimeout(() => {
                const ctx2 = new AudioContext();
                const osc2 = ctx2.createOscillator();
                const gain2 = ctx2.createGain();
                osc2.connect(gain2);
                gain2.connect(ctx2.destination);
                osc2.frequency.value = 1000;
                gain2.gain.value = 0.3;
                osc2.start();
                setTimeout(() => { osc2.stop(); ctx2.close(); }, 300);
              }, 350);
            } catch { /* silent fail */ }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, remaining]);

  const switchMode = useCallback((m: Mode) => {
    setMode(m);
    setTotalSeconds(m.minutes * 60);
    setRemaining(m.minutes * 60);
    setRunning(false);
    setFinished(false);
  }, []);

  const toggle = useCallback(() => {
    if (finished) {
      setRemaining(mode.minutes * 60);
      setFinished(false);
    }
    setRunning((r) => !r);
  }, [finished, mode.minutes]);

  const reset = useCallback(() => {
    setRunning(false);
    setRemaining(mode.minutes * 60);
    setFinished(false);
  }, [mode.minutes]);

  // SVG ring
  const size = 200;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = totalSeconds > 0 ? remaining / totalSeconds : 1;
  const offset = circumference * (1 - progress);

  // Status text
  const statusText = finished
    ? "🎉 时间到！"
    : running
    ? `${mode.label}中...`
    : remaining === totalSeconds
    ? `准备${mode.label}`
    : `${mode.label}已暂停`;

  return (
    <section id="pomodoro" className="py-24 sm:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-amber-500/5 to-yellow-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 text-sm font-medium text-amber-400 mb-4">
            <Timer className="w-3.5 h-3.5" />
            番茄钟
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            专注<span className="gradient-text">时光</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            用番茄工作法管理你的专注时间 🍅
          </p>
        </motion.div>

        {/* Mode Selector */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex justify-center gap-2 mb-10"
        >
          {MODES.map((m) => (
            <Button
              key={m.label}
              variant={mode.label === m.label ? "default" : "outline"}
              size="sm"
              onClick={() => switchMode(m)}
              className={`rounded-full px-5 gap-1.5 transition-all duration-300 ${
                mode.label === m.label
                  ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-black font-bold shadow-lg shadow-amber-500/20"
                  : "hover:bg-amber-500/10 hover:border-amber-500/30"
              }`}
            >
              {m.icon}
              {m.label} {m.minutes}min
            </Button>
          ))}
        </motion.div>

        {/* Timer Circle */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center"
        >
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="-rotate-90">
              {/* Background ring */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="currentColor"
                strokeWidth={strokeWidth}
                className="text-muted/30"
              />
              {/* Progress ring */}
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="none"
                stroke="url(#pomodoroGradient)"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                className="transition-all duration-1000 ease-linear"
              />
              <defs>
                <linearGradient id="pomodoroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={mode.color} />
                  <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
              </defs>
            </svg>
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-4xl font-mono font-bold text-foreground tabular-nums">
                {formatTime(remaining)}
              </span>
              <span className="text-sm text-amber-400 mt-2">{statusText}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 mt-8">
            <Button
              size="lg"
              onClick={toggle}
              className="rounded-full px-8 gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold shadow-lg shadow-amber-500/20 transition-all duration-300 hover:scale-105"
            >
              {running ? (
                <>
                  <Pause className="w-4 h-4" />
                  暂停
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  {finished ? "重新开始" : "开始"}
                </>
              )}
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={reset}
              className="rounded-full px-6 gap-2 border-amber-500/20 hover:bg-amber-500/10 hover:border-amber-500/40"
            >
              <RotateCcw className="w-4 h-4" />
              重置
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
