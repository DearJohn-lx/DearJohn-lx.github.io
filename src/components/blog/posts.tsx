"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Calendar, Clock, ArrowUpRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/lib/blog-data";

const categories = ["全部", "前端开发", "后端 & 运维", "工程化"];

const categoryEmojis: Record<string, string> = {
  "全部": "🌟",
  "前端开发": "🎨",
  "后端 & 运维": "🔧",
  "工程化": "⚙️",
};

// ===== 3D Tilt Card Hook =====
function useTilt() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    setStyle({
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`,
      transition: "transform 0.1s ease-out",
    });

    // Glare effect
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(251,191,36,0.15) 0%, transparent 60%)`,
      opacity: "1",
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      transition: "transform 0.6s ease-out",
    });
    setGlareStyle({ opacity: "0" });
  }, []);

  return { cardRef, style, glareStyle, handleMouseMove, handleMouseLeave };
}

// ===== Single Post Card with 3D Tilt =====
function TiltCard({ post, index, inView }: { post: typeof blogPosts[0]; index: number; inView: boolean }) {
  const { cardRef, style, glareStyle, handleMouseMove, handleMouseLeave } = useTilt();

  return (
    <motion.article
      initial={{ y: 60, opacity: 0, scale: 0.95 }}
      animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Hover glow */}
      <div className={`absolute -inset-0.5 bg-gradient-to-r ${post.coverGradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700`} />

      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={style}
        className="relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden group-hover:border-amber-500/30"
      >
        {/* Glare overlay */}
        <div
          className="absolute inset-0 z-10 pointer-events-none rounded-2xl transition-opacity duration-300"
          style={glareStyle}
        />

        {/* Cover gradient */}
        <div
          className={`h-44 bg-gradient-to-br ${post.coverGradient} relative overflow-hidden`}
        >
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute top-4 left-4 w-16 h-16 border border-white/10 rounded-full" />
          <div className="absolute top-8 left-8 w-24 h-24 border border-white/10 rounded-full" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/5 rounded-full" />

          <div className="absolute bottom-3 left-3">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/10">
              {post.category}
            </span>
          </div>

          <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          <h3 className="font-bold text-base mb-2 group-hover:text-amber-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 font-medium border border-amber-500/10"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-3 border-t border-border/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-amber-400" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-yellow-500" />
              {post.readTime} 分钟
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

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
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-gradient-to-br from-amber-500/5 to-yellow-600/5 rounded-full blur-3xl animate-morph" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-gradient-to-br from-yellow-500/5 to-amber-600/5 rounded-full blur-3xl animate-morph" style={{ animationDelay: "-4s" }} />

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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/10 to-yellow-500/10 border border-amber-500/20 text-sm font-medium text-amber-400 mb-4"
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
                  ? "bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-black font-bold shadow-lg shadow-amber-500/20 scale-105"
                  : "hover:bg-amber-500/10 hover:border-amber-500/30"
              }`}
            >
              <span className="mr-1.5">{categoryEmojis[cat]}</span>
              {cat}
            </Button>
          ))}
        </motion.div>

        {/* Post Grid with 3D tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => (
            <TiltCard key={post.id} post={post} index={i} inView={inView} />
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
