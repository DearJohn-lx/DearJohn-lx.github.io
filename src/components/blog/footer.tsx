"use client";

import { Github, Mail, Heart } from "lucide-react";
import { profileLinks } from "@/lib/blog-data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-card overflow-hidden">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left - Brand */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 flex items-center justify-center text-black font-bold text-sm">
                LX
              </div>
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-600 opacity-20 blur-md" />
            </div>
            <div>
              <p className="font-bold gradient-text">LX Blog</p>
              <p className="text-xs text-muted-foreground">
                代码即诗 · 用技术书写世界
              </p>
            </div>
          </div>

          {/* Center - Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1.5">
            © {currentYear} LX · 用
            <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400 animate-bounce-gentle" />
            和代码构建
          </p>

          {/* Right - Social */}
          <div className="flex items-center gap-3">
            <a
              href={profileLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-black hover:bg-gradient-to-br hover:from-amber-400 hover:to-yellow-600 hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/20"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profileLinks.email}`}
              className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-black hover:bg-gradient-to-br hover:from-yellow-400 hover:to-amber-500 hover:border-transparent transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-amber-500/20"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom decoration */}
        <div className="mt-8 pt-6 border-t border-border/50 text-center">
          <p className="text-xs text-muted-foreground/50">
            🚀 Powered by Next.js · Tailwind CSS · Framer Motion
          </p>
        </div>
      </div>
    </footer>
  );
}
