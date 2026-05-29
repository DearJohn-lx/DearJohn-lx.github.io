"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Layers, Rocket, Coffee } from "lucide-react";

const highlights = [
  {
    icon: <Code2 className="w-5 h-5" />,
    title: "前端开发",
    description: "精通 React / Next.js / TypeScript 生态，追求极致用户体验",
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: "全栈能力",
    description: "前后端一体化开发，从数据库到部署全链路覆盖",
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    title: "持续学习",
    description: "保持技术热情，关注前沿动态，不断探索新技术",
  },
  {
    icon: <Coffee className="w-5 h-5" />,
    title: "开源精神",
    description: "积极参与开源社区，分享知识，回馈技术生态",
  },
];

export function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 sm:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-emerald-500 tracking-wider uppercase mb-3 block">
            关于我
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            热爱代码，享受创造
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            我是一名专注于前端与全栈开发的工程师，热衷于用代码构建优雅且高效的解决方案。
            在这个博客里，我记录技术探索的过程，分享开发中的思考与经验。
          </p>
        </motion.div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {highlights.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ y: 40, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="group relative p-6 rounded-2xl border border-border bg-card hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
