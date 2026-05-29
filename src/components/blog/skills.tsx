"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/lib/blog-data";
import { Zap } from "lucide-react";

function CircularProgress({ value, size = 72, strokeWidth = 4 }: { value: number; size?: number; strokeWidth?: number }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-muted/50"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#skillGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-sm font-bold text-violet-400">{value}%</span>
      </div>
    </div>
  );
}

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 sm:py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-violet-500/8 to-purple-600/8 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/5 to-violet-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.1, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 mb-4"
          >
            <Zap className="w-3.5 h-3.5" />
            技术栈
          </motion.span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            技能与<span className="gradient-text">工具</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            多年开发积累的技术栈，覆盖前端、后端和运维等领域 🔧
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ y: 40, opacity: 0, scale: 0.9 }}
              animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.5,
                delay: 0.06 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >
              {/* Hover glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-400 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-15 blur-lg transition-all duration-500" />

              <div className="relative p-5 sm:p-6 rounded-2xl border border-border bg-card transition-all duration-500 group-hover:border-violet-500/30 group-hover:shadow-xl group-hover:shadow-violet-500/5 group-hover:-translate-y-1 text-center">
                {/* Shimmer */}
                <div className="absolute inset-0 shine-effect rounded-2xl pointer-events-none" />

                <motion.div
                  className="text-3xl mb-3"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {skill.icon}
                </motion.div>

                <h4 className="font-bold text-sm mb-0.5">{skill.name}</h4>
                <span className="text-xs text-muted-foreground mb-3 block">
                  {skill.category}
                </span>

                {/* Circular Progress */}
                <div className="flex justify-center mt-2">
                  <CircularProgress value={skill.level} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
