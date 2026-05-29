"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, Clock, ArrowUpRight, Tag, Sparkles, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/blog-data";

const categories = ["全部", "前端开发", "后端 & 运维", "工程化"];

const categoryEmojis: Record<string, string> = {
  "全部": "🌟",
  "前端开发": "🎨",
  "后端 & 运维": "🔧",
  "工程化": "⚙️",
};

export function Posts() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("全部");

  const filtered =
    activeCategory === "全部"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <section id="posts" className="py-24 sm:py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 via-transparent to-muted/30" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-gradient-to-br from-violet-400/5 to-cyan-400/5 rounded-full blur-3xl animate-morph" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-gradient-to-br from-emerald-400/5 to-amber-400/5 rounded-full blur-3xl animate-morph" style={{ animationDelay: "-4s" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.1, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 to-amber-500/10 border border-violet-500/20 text-sm font-medium text-violet-500 mb-4"
          >
            <TrendingUp className="w-3.5 h-3.5" />
            博客文章
          </motion.span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            最近<span className="gradient-text">文章</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            在这里分享技术心得与开发经验，希望对你有所启发 ✨
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className={`rounded-full px-5 transition-all duration-300 ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-white shadow-lg shadow-emerald-500/20 scale-105"
                  : "hover:bg-emerald-500/10 hover:border-emerald-500/30"
              }`}
            >
              <span className="mr-1.5">{categoryEmojis[cat]}</span>
              {cat}
            </Button>
          ))}
        </motion.div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ y: 60, opacity: 0, scale: 0.95 }}
              animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className="group relative"
            >
              {/* Hover glow */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${post.coverGradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700`} />

              <div className="relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden transition-all duration-500 group-hover:border-transparent group-hover:shadow-2xl group-hover:-translate-y-2">
                {/* Cover gradient */}
                <div
                  className={`h-44 bg-gradient-to-br ${post.coverGradient} relative overflow-hidden`}
                >
                  {/* Pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
                      backgroundSize: "24px 24px",
                    }}
                  />
                  {/* Animated circles */}
                  <div className="absolute top-4 left-4 w-16 h-16 border border-white/10 rounded-full" />
                  <div className="absolute top-8 left-8 w-24 h-24 border border-white/10 rounded-full" />
                  <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full" />

                  <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/10">
                      {post.category}
                    </span>
                  </div>

                  {/* Hover arrow */}
                  <motion.div
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10"
                    whileHover={{ scale: 1.1, rotate: 45 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.div>
                </div>

                {/* Content */}
                <div className="flex-1 p-5 flex flex-col">
                  <h3 className="font-bold text-base mb-2 group-hover:text-emerald-500 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/10"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Meta */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground pt-3 border-t border-border/50">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-emerald-400" />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3 h-3 text-amber-400" />
                      {post.readTime} 分钟
                    </span>
                  </div>
                </div>

                {/* Bottom shine effect */}
                <div className="absolute inset-0 shine-effect rounded-2xl pointer-events-none" />
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-muted-foreground text-lg"
          >
            该分类暂无文章 📭
          </motion.div>
        )}
      </div>
    </section>
  );
}
