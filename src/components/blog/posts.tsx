"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Calendar, Clock, ArrowUpRight, TrendingUp, X, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { blogPosts, type BlogPost } from "@/lib/blog-data";

const categories = ["全部", "前端开发", "后端 & 运维", "工程化", "生活"];

const categoryEmojis: Record<string, string> = {
  "全部": "🌟",
  "前端开发": "🎨",
  "后端 & 运维": "🔧",
  "工程化": "⚙️",
  "生活": "🍳",
};

// ===== Markdown-like renderer for recipe content =====
function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let key = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    if (line.startsWith("---")) {
      elements.push(<hr key={key++} className="my-6 border-violet-500/15" />);
      continue;
    }

    if (line.startsWith("## ")) {
      elements.push(
        <h3 key={key++} className="text-xl font-bold mt-8 mb-3 gradient-text">
          {line.replace("## ", "")}
        </h3>
      );
      continue;
    }

    if (line.startsWith("- **")) {
      const match = line.match(/^- \*\*(.+?)\*\*[：:]?\s*(.*)$/);
      if (match) {
        elements.push(
          <div key={key++} className="flex gap-2 ml-2 mb-1.5">
            <span className="text-violet-400 font-bold shrink-0">{match[1]}：</span>
            <span className="text-muted-foreground">{match[2]}</span>
          </div>
        );
      }
      continue;
    }

    if (line.startsWith("  ")) {
      const trimmed = line.trim();
      const numberedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (numberedMatch) {
        elements.push(
          <div key={key++} className="flex gap-2 ml-6 mb-1">
            <span className="w-5 h-5 rounded-full bg-violet-500/15 text-violet-400 text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">
              {numberedMatch[1]}
            </span>
            <span className="text-muted-foreground">{numberedMatch[2]}</span>
          </div>
        );
      }
      continue;
    }

    if (line.trim() === "") {
      continue;
    }

    elements.push(
      <p key={key++} className="text-muted-foreground mb-2">{line}</p>
    );
  }

  return elements;
}

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
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(139,92,246,0.15) 0%, transparent 60%)`,
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

// ===== Article Detail Dialog =====
function ArticleDialog({ post, open, onOpenChange }: { post: BlogPost | null; open: boolean; onOpenChange: (v: boolean) => void }) {
  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] bg-card border-violet-500/20 p-0 overflow-hidden">
        <DialogTitle className="sr-only">{post.title}</DialogTitle>

        {/* Cover gradient header */}
        <div className={`h-32 bg-gradient-to-br ${post.coverGradient} relative`}>
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

          {/* Category badge */}
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/10">
              {post.category}
            </span>
            <div className="flex items-center gap-3 text-white/70 text-xs">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime} 分钟
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(85vh-8rem)]">
          <h2 className="text-2xl font-black mb-6">{post.title}</h2>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 font-medium border border-violet-500/10"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Article body */}
          {post.content ? (
            <div className="prose-custom">
              {renderContent(post.content)}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-30" />
              <p>文章详情正在撰写中，敬请期待…</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ===== Single Post Card with 3D Tilt =====
function TiltCard({ post, index, inView, onClick }: { post: typeof blogPosts[0]; index: number; inView: boolean; onClick: () => void }) {
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
        onClick={onClick}
        className="relative flex flex-col rounded-2xl border border-border bg-card overflow-hidden group-hover:border-violet-500/30 cursor-pointer"
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

          {/* Click indicator */}
          <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/10 group-hover:scale-110 transition-transform">
            <BookOpen className="w-4 h-4" />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col">
          <h3 className="font-bold text-base mb-2 group-hover:text-violet-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2 flex-1">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 font-medium border border-violet-500/10"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 text-xs text-muted-foreground pt-3 border-t border-border/50">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-violet-400" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3 text-purple-500" />
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
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = useCallback((post: BlogPost) => {
    setSelectedPost(post);
    setDialogOpen(true);
  }, []);

  const filtered =
    activeCategory === "全部"
      ? blogPosts
      : blogPosts.filter((p) => p.category === activeCategory);

  return (
    <section id="posts" className="py-24 sm:py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 via-transparent to-muted/30" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-gradient-to-br from-violet-500/5 to-purple-600/5 rounded-full blur-3xl animate-morph" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-violet-600/5 rounded-full blur-3xl animate-morph" style={{ animationDelay: "-4s" }} />

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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 text-sm font-medium text-violet-400 mb-4"
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
                  ? "bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-400 hover:to-purple-500 text-white font-bold shadow-lg shadow-violet-500/20 scale-105"
                  : "hover:bg-violet-500/10 hover:border-violet-500/30"
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
            <TiltCard key={post.id} post={post} index={i} inView={inView} onClick={() => handleCardClick(post)} />
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

      {/* Article Detail Dialog */}
      <ArticleDialog post={selectedPost} open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}
