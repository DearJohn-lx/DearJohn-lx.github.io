"use client";

import { Github, Mail, Heart } from "lucide-react";
import { profileLinks } from "@/lib/blog-data";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Left - Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold text-xs">
              LX
            </div>
            <div>
              <p className="text-sm font-medium">LX Blog</p>
              <p className="text-xs text-muted-foreground">
                代码即诗 · 用技术书写世界
              </p>
            </div>
          </div>

          {/* Center - Copyright */}
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {currentYear} LX · 用
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
            和代码构建
          </p>

          {/* Right - Social */}
          <div className="flex items-center gap-3">
            <a
              href={profileLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-emerald-500/30 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${profileLinks.email}`}
              className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-emerald-500/30 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
