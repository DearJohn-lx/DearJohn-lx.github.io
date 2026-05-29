"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import { Calendar, Clock, TrendingUp, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { blogPosts, type BlogPost } from "@/lib/blog-data";

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

// ===== Article Detail Dialog =====
function ArticleDialog({ post, open, onOpenChange }: { post: BlogPost | null; open: boolean; onOpenChange: (v: boolean) => void }) {
  if (!post) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[85vh] bg-card border-violet-500/20 p-0 overflow-hidden">
        <DialogTitle className="sr-only">{post.title}</DialogTitle>

        {/* Cover image or gradient header */}
        <div className="h-44 relative overflow-hidden">
          {post.coverImage ? (
            <>
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </>
          ) : (
            <div className={`h-full bg-gradient-to-br ${post.coverGradient}`}>
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
          )}

          {/* Category badge & meta */}
          <div className="absolute bottom-4 left-6 flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold border border-white/10">
              {post.category}
            </span>
            <div className="flex items-center gap-3 text-white/80 text-xs">
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
        <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(85vh-11rem)]">
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

// ===== Single Featured Post Card (full-width with cover image) =====
function FeaturedCard({ post, inView, onClick }: { post: BlogPost; inView: boolean; onClick: () => void }) {
  return (
    <motion.article
      initial={{ y: 60, opacity: 0, scale: 0.98 }}
      animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative max-w-2xl mx-auto"
    >
      {/* Hover glow */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${post.coverGradient} rounded-3xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700`} />

      <div
        onClick={onClick}
        className="relative flex flex-col sm:flex-row rounded-2xl border border-border bg-card overflow-hidden group-hover:border-violet-500/30 cursor-pointer transition-all duration-500 group-hover:shadow-2xl group-hover:shadow-violet-500/10"
      >
        {/* Cover image */}
        <div className="sm:w-64 h-52 sm:h-auto relative overflow-hidden shrink-0">
          {post.coverImage ? (
            <>
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/30 hidden sm:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-card/40 to-transparent sm:hidden" />
            </>
          ) : (
            <div className={`h-full bg-gradient-to-br ${post.coverGradient} relative`}>
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)`,
                  backgroundSize: "24px 24px",
                }}
              />
            </div>
          )}
          {/* Category badge on image */}
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-bold border border-white/10">
              🍳 {post.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col justify-center">
          <h3 className="font-bold text-xl mb-3 group-hover:text-violet-400 transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {post.excerpt}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-0.5 rounded-full bg-violet-500/10 text-violet-400 font-medium border border-violet-500/10"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3 h-3 text-violet-400" />
                {post.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3 h-3 text-purple-500" />
                {post.readTime} 分钟
              </span>
            </div>
            <span className="text-xs text-violet-400 font-medium group-hover:underline flex items-center gap-1">
              阅读全文
              <BookOpen className="w-3 h-3" />
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
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCardClick = useCallback((post: BlogPost) => {
    setSelectedPost(post);
    setDialogOpen(true);
  }, []);

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
            在这里分享技术与生活，希望对你有所启发 ✨
          </p>
        </motion.div>

        {/* Featured Posts */}
        <div className="space-y-6">
          {blogPosts.map((post) => (
            <FeaturedCard key={post.id} post={post} inView={inView} onClick={() => handleCardClick(post)} />
          ))}
        </div>

        {blogPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 text-muted-foreground text-lg"
          >
            暂无文章 📭
          </motion.div>
        )}
      </div>

      {/* Article Detail Dialog */}
      <ArticleDialog post={selectedPost} open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}
