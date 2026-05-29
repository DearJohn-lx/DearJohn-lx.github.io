"use client";

import { useState, useSyncExternalStore, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Sun, Moon, Menu, X, Sparkles, Timer, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const navLinks = [
  { label: "首页", href: "#hero", emoji: "🏠" },
  { label: "关于", href: "#about", emoji: "✨" },
  { label: "博客", href: "#posts", emoji: "📝" },
  { label: "技能", href: "#skills", emoji: "⚡" },
  { label: "联系", href: "#contact", emoji: "📬" },
];

function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#hero");
            }}
            className="flex items-center gap-2.5 group"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-black font-bold text-sm tracking-tighter group-hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-500/25">
                LX
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 opacity-0 group-hover:opacity-30 blur-md transition-opacity duration-300" />
            </div>
            <span className="font-bold text-lg hidden sm:block gradient-text">
              LX Blog
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg transition-all duration-300 hover:bg-amber-500/10 hover:shadow-sm hover:shadow-amber-500/10 relative group"
              >
                <span className="hidden group-hover:inline mr-1 transition-all duration-200">
                  {link.emoji}
                </span>
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5">
            {/* Daily Quote */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setQuoteOpen(true)}
              className="h-9 w-9 rounded-xl hover:bg-amber-500/10 transition-all duration-300"
              title="每日一言"
            >
              <Quote className="h-4 w-4 text-amber-400" />
            </Button>

            {/* Pomodoro */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const el = document.querySelector("#pomodoro");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="h-9 w-9 rounded-xl hover:bg-amber-500/10 transition-all duration-300"
              title="番茄钟"
            >
              <Timer className="h-4 w-4 text-amber-400" />
            </Button>

            {/* Theme Toggle */}
            {mounted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="h-9 w-9 rounded-xl hover:bg-amber-500/10 transition-all duration-300"
              >
                <motion.div
                  key={theme}
                  initial={{ rotate: -90, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === "dark" ? (
                    <Sun className="h-4 w-4 text-amber-400" />
                  ) : (
                    <Moon className="h-4 w-4 text-amber-500" />
                  )}
                </motion.div>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 rounded-xl"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-b border-border md:hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.05 * i }}
                  className="px-4 py-3 text-sm text-muted-foreground hover:text-foreground hover:bg-amber-500/10 rounded-xl transition-all duration-300 flex items-center gap-2"
                >
                  <span>{link.emoji}</span>
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Daily Quote Dialog */}
      <DailyQuoteDialog open={quoteOpen} onOpenChange={setQuoteOpen} />
    </>
  );
}

// ===== Daily Quote Component =====
const quotes = [
  { text: "人生如逆旅，我亦是行人。", author: "苏轼" },
  { text: "山重水复疑无路，柳暗花明又一村。", author: "陆游" },
  { text: "博观而约取，厚积而薄发。", author: "苏轼" },
  { text: "路漫漫其修远兮，吾将上下而求索。", author: "屈原" },
  { text: "不积跬步，无以至千里；不积小流，无以成江海。", author: "荀子" },
  { text: "千磨万击还坚劲，任尔东西南北风。", author: "郑燮" },
  { text: "纸上得来终觉浅，绝知此事要躬行。", author: "陆游" },
  { text: "长风破浪会有时，直挂云帆济沧海。", author: "李白" },
  { text: "天行健，君子以自强不息。", author: "《周易》" },
  { text: "海纳百川，有容乃大；壁立千仞，无欲则刚。", author: "林则徐" },
  { text: "业精于勤，荒于嬉；行成于思，毁于随。", author: "韩愈" },
  { text: "沉舟侧畔千帆过，病树前头万木春。", author: "刘禹锡" },
  { text: "问渠那得清如许？为有源头活水来。", author: "朱熹" },
  { text: "欲穷千里目，更上一层楼。", author: "王之涣" },
  { text: "宝剑锋从磨砺出，梅花香自苦寒来。", author: "《警世贤文》" },
];

function DailyQuoteDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const [quoteIdx, setQuoteIdx] = useState(() => Math.floor(Math.random() * quotes.length));
  const [fade, setFade] = useState(true);

  const refresh = useCallback(() => {
    setFade(false);
    setTimeout(() => {
      let next: number;
      do {
        next = Math.floor(Math.random() * quotes.length);
      } while (next === quoteIdx && quotes.length > 1);
      setQuoteIdx(next);
      setFade(true);
    }, 300);
  }, [quoteIdx]);

  const q = quotes[quoteIdx];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-card border-amber-500/20 p-0 overflow-hidden">
        {/* Top gradient bar */}
        <div className="h-1.5 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400" />

        <div className="p-8 relative">
          {/* 3D floating card effect */}
          <div className="relative">
            {/* Glow */}
            <div className="absolute -inset-4 bg-gradient-to-r from-amber-400/10 to-yellow-500/10 rounded-3xl blur-2xl" />

            <div className="relative rounded-2xl border border-amber-500/15 bg-gradient-to-br from-amber-500/5 to-yellow-600/5 p-8 text-center">
              {/* Quote icon */}
              <div className="mb-4">
                <span className="text-5xl text-amber-400/30 font-serif leading-none">&ldquo;</span>
              </div>

              {/* Quote text with fade */}
              <AnimatePresence mode="wait">
                {fade && (
                  <motion.div
                    key={quoteIdx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p
                      className="text-lg sm:text-xl leading-relaxed mb-6 text-foreground"
                      style={{ fontFamily: "'Noto Serif SC', serif" }}
                    >
                      {q.text}
                    </p>
                    <p
                      className="text-sm text-amber-400/70"
                      style={{ fontFamily: "'Noto Serif SC', serif" }}
                    >
                      —— {q.author}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Refresh button */}
          <div className="flex justify-center mt-6">
            <Button
              variant="outline"
              size="sm"
              onClick={refresh}
              className="rounded-full gap-2 border-amber-500/20 hover:bg-amber-500/10 hover:border-amber-500/40 transition-all duration-300"
            >
              <motion.span
                whileTap={{ rotate: 360 }}
                transition={{ duration: 0.4 }}
              >
                ↻
              </motion.span>
              换一条
            </Button>
          </div>

          {/* Decorative bottom text */}
          <p className="text-center text-xs text-muted-foreground/40 mt-4">
            ✨ 每日一言
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
