"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, ExternalLink, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profileLinks } from "@/lib/blog-data";

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-24 sm:py-32 bg-muted/30" ref={ref}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-emerald-500 tracking-wider uppercase mb-3 block">
            联系我
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            保持联系
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            无论是技术交流、项目合作，还是随意聊聊，都欢迎联系我。
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
          {/* Email */}
          <motion.a
            href={`mailto:${profileLinks.email}`}
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group flex flex-col items-center p-8 rounded-2xl border border-border bg-card hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Mail className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">邮箱</h3>
            <p className="text-sm text-muted-foreground break-all">
              {profileLinks.email}
            </p>
          </motion.a>

          {/* GitHub */}
          <motion.a
            href={profileLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="group flex flex-col items-center p-8 rounded-2xl border border-border bg-card hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Github className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">GitHub</h3>
            <p className="text-sm text-muted-foreground">DearJohn-lx</p>
          </motion.a>

          {/* Blog */}
          <motion.a
            href={profileLinks.blog}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ y: 40, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="group flex flex-col items-center p-8 rounded-2xl border border-border bg-card hover:border-emerald-500/30 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300 text-center"
          >
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ExternalLink className="w-6 h-6" />
            </div>
            <h3 className="font-semibold mb-1">博客</h3>
            <p className="text-sm text-muted-foreground">DearJohn-lx.github.io</p>
          </motion.a>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            size="lg"
            className="bg-emerald-500 hover:bg-emerald-600 text-white gap-2 rounded-full px-8"
            asChild
          >
            <a href={`mailto:${profileLinks.email}`}>
              <Send className="w-4 h-4" />
              给我发邮件
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
