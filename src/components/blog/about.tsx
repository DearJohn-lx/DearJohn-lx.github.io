"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Layers, Rocket, Coffee, Sparkles, Crown } from "lucide-react";

const highlights = [
  {
    icon: <Code2 className="w-6 h-6" />,
    title: "前端开发",
    description: "精通 React / Next.js / TypeScript 生态，追求极致用户体验",
    gradient: "from-amber-400 to-yellow-500",
    emoji: "⚛️",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    title: "全栈能力",
    description: "前后端一体化开发，从数据库到部署全链路覆盖",
    gradient: "from-yellow-400 to-amber-500",
    emoji: "🏗️",
  },
  {
    icon: <Rocket className="w-6 h-6" />,
    title: "持续学习",
    description: "保持技术热情，关注前沿动态，不断探索新技术",
    gradient: "from-amber-500 to-orange-400",
    emoji: "🚀",
  },
  {
    icon: <Coffee className="w-6 h-6" />,
    title: "开源精神",
    description: "积极参与开源社区，分享知识，回馈技术生态",
    gradient: "from-yellow-500 to-amber-400",
    emoji: "☕",
  },
];

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 sm:py-32 relative overflow-hidden" ref={ref}>
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-amber-500/5 to-yellow-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-gradient-to-br from-yellow-500/5 to-amber-600/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6">
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 text-sm font-medium text-amber-400 mb-4"
          >
            <Crown className="w-3.5 h-3.5" />
            关于我
          </motion.span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            热爱代码，<span className="gradient-text">享受创造</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            我是一名专注于前端与全栈开发的工程师，热衷于用代码构建优雅且高效的解决方案。
            在这个博客里，我记录技术探索的过程，分享开发中的思考与经验。
          </p>
        </motion.div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ y: 60, opacity: 0, rotateX: 15 }}
              animate={inView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              {/* Glow effect */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`} />

              <div className="relative p-6 rounded-2xl border border-border bg-card overflow-hidden transition-all duration-500 group-hover:border-amber-500/30 group-hover:shadow-2xl group-hover:shadow-amber-500/5 group-hover:-translate-y-1">
                {/* Shimmer effect */}
                <div className="absolute inset-0 shine-effect" />

                {/* Top accent line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Floating emoji on hover */}
                <motion.span
                  className="absolute top-3 right-3 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {item.emoji}
                </motion.span>

                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.gradient} p-[1px] mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <div className="w-full h-full rounded-xl bg-card flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-2 group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
