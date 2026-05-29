"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Compass, BookOpen, Music, Gamepad2, Camera, Globe, Palette, Cpu } from "lucide-react";

const otherItems = [
  {
    icon: <BookOpen className="w-5 h-5" />,
    title: "阅读",
    desc: "科幻、哲学、技术书籍，每年至少 20 本",
    emoji: "📚",
  },
  {
    icon: <Music className="w-5 h-5" />,
    title: "音乐",
    desc: "后摇、电子、Lo-fi，写代码的必备伴侣",
    emoji: "🎵",
  },
  {
    icon: <Gamepad2 className="w-5 h-5" />,
    title: "游戏",
    desc: "独立游戏爱好者，偶尔也玩 3A 大作",
    emoji: "🎮",
  },
  {
    icon: <Camera className="w-5 h-5" />,
    title: "摄影",
    desc: "街拍、风光，用镜头记录生活的瞬间",
    emoji: "📷",
  },
  {
    icon: <Globe className="w-5 h-5" />,
    title: "旅行",
    desc: "探索不同的城市与文化，开阔视野",
    emoji: "🌍",
  },
  {
    icon: <Palette className="w-5 h-5" />,
    title: "设计",
    desc: "UI/UX 设计，追求美感与可用性的平衡",
    emoji: "🎨",
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "硬件",
    desc: "机械键盘、客制化，折腾也是一种乐趣",
    emoji: "⌨️",
  },
  {
    icon: <Compass className="w-5 h-5" />,
    title: "探索",
    desc: "对新事物保持好奇，永远在学习的路上",
    emoji: "🧭",
  },
];

export function Other() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="other" className="py-24 sm:py-32 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 -z-10">
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-br from-violet-500/5 to-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-br from-purple-500/5 to-violet-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 to-violet-500/10 border border-purple-500/20 text-sm font-medium text-purple-400 mb-4">
            <Compass className="w-3.5 h-3.5" />
            更多
          </span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            生活<span className="gradient-text">其他</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            除了写代码，生活中还有很多有趣的事情 🌈
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {otherItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              className="group relative p-5 rounded-2xl border border-border bg-card transition-all duration-300 hover:border-violet-500/30 hover:shadow-lg hover:shadow-violet-500/5 hover:-translate-y-1 text-center"
            >
              {/* Hover glow */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-400 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-10 blur-lg transition-all duration-500" />

              <motion.div
                className="text-3xl mb-3"
                whileHover={{ scale: 1.3, rotate: 10 }}
                transition={{ type: "spring", stiffness: 400 }}
              >
                {item.emoji}
              </motion.div>
              <h4 className="font-bold text-sm mb-1 group-hover:text-violet-400 transition-colors">
                {item.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
