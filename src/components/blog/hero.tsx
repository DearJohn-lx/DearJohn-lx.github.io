"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, FileText, Sparkles, Zap, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profileLinks } from "@/lib/blog-data";

const floatingIcons = [
  { emoji: "⚛️", x: "10%", y: "20%", delay: 0, size: "2rem" },
  { emoji: "💎", x: "85%", y: "15%", delay: 1.5, size: "1.8rem" },
  { emoji: "🎨", x: "75%", y: "70%", delay: 0.8, size: "2.2rem" },
  { emoji: "🚀", x: "15%", y: "75%", delay: 2, size: "1.6rem" },
  { emoji: "💡", x: "90%", y: "45%", delay: 0.5, size: "1.5rem" },
  { emoji: "👑", x: "5%", y: "50%", delay: 1.2, size: "1.7rem" },
  { emoji: "✨", x: "50%", y: "10%", delay: 1.8, size: "1.4rem" },
  { emoji: "🔥", x: "40%", y: "85%", delay: 0.3, size: "1.9rem" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Morphing blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-br from-amber-500/15 to-yellow-600/10 rounded-full blur-3xl animate-morph" />
        <div className="absolute bottom-1/4 -right-32 w-[28rem] h-[28rem] bg-gradient-to-br from-yellow-500/10 to-amber-600/8 rounded-full blur-3xl animate-morph" style={{ animationDelay: "-4s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-gradient-to-br from-amber-500/5 to-yellow-600/5 rounded-full blur-3xl animate-morph" style={{ animationDelay: "-2s" }} />

        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(rgba(251,191,36,0.2) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(251,191,36,0.2) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Floating emojis */}
        {floatingIcons.map((icon, i) => (
          <motion.div
            key={i}
            className="absolute select-none pointer-events-none"
            style={{ left: icon.x, top: icon.y, fontSize: icon.size }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 0.5, 0.5, 0],
              scale: [0, 1, 1, 0],
              y: [0, -30, -60],
            }}
            transition={{
              duration: 6,
              delay: icon.delay,
              repeat: Infinity,
              repeatDelay: 4,
              ease: "easeInOut",
            }}
          >
            {icon.emoji}
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Avatar */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            {/* Rotating gradient ring */}
            <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 animate-spin-slow opacity-60 blur-sm" />
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400 animate-spin-slow" />
            <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden ring-4 ring-background">
              <img
                src="/avatar.png"
                alt="LX"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Online badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8, type: "spring" }}
              className="absolute -bottom-1 -right-1 w-10 h-10 bg-gradient-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center text-black text-xs font-bold ring-3 ring-background shadow-lg shadow-amber-500/30"
            >
              LX
            </motion.div>
          </div>
        </motion.div>

        {/* Badge */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-amber-500/10 border border-amber-500/20 text-sm font-medium mb-6">
            <Crown className="w-4 h-4 text-amber-400" />
            <span className="gradient-text font-semibold">你好，欢迎来到我的博客</span>
            <Zap className="w-4 h-4 text-yellow-400" />
          </span>
        </motion.div>

        {/* Name with gradient */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tight mb-5"
        >
          我是{" "}
          <span className="gradient-text">LX</span>
        </motion.h1>

        {/* Tagline */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-xl sm:text-2xl md:text-3xl font-bold mb-4"
        >
          <span className="text-muted-foreground">代码即诗</span>
          <span className="mx-3 text-amber-400">·</span>
          <span className="gradient-text">用技术书写世界</span>
        </motion.div>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed"
        >
          一名热爱编程的开发者，专注于前端技术与全栈开发
          <br className="hidden sm:block" />
          在这里记录学习与思考的每一刻 💡
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold gap-2 rounded-full px-8 shadow-xl shadow-amber-500/25 hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300 hover:scale-105"
            onClick={() => {
              document
                .querySelector("#posts")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <FileText className="w-4 h-4" />
            阅读博客
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 rounded-full px-8 border-amber-500/30 hover:bg-amber-500/10 hover:border-amber-500/50 text-foreground transition-all duration-300 hover:scale-105"
            asChild
          >
            <a
              href={profileLinks.github}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-amber-400/30"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
