"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { skills } from "@/lib/blog-data";

const skillCategories = ["语言", "框架", "样式", "运行时", "数据库", "运维", "工具", "设计"];

export function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 sm:py-32" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-emerald-500 tracking-wider uppercase mb-3 block">
            技术栈
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            技能与工具
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            多年开发积累的技术栈，覆盖前端、后端和运维等领域。
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {skills.map((skill, i) => (
            <motion.div
              key={skill.name}
              initial={{ y: 30, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 * i }}
              className="group relative p-4 sm:p-5 rounded-2xl border border-border bg-card hover:border-emerald-500/30 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xl">{skill.icon}</span>
                <div>
                  <h4 className="font-semibold text-sm">{skill.name}</h4>
                  <span className="text-xs text-muted-foreground">
                    {skill.category}
                  </span>
                </div>
              </div>
              {/* Progress bar */}
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                  transition={{ duration: 1, delay: 0.3 + 0.05 * i, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                />
              </div>
              <div className="mt-1.5 text-xs text-muted-foreground text-right">
                {skill.level}%
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
