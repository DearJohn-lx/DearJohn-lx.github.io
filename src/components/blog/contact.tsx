"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, ExternalLink, Send, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { profileLinks } from "@/lib/blog-data";

const contactItems = [
  {
    icon: <Mail className="w-7 h-7" />,
    title: "邮箱",
    subtitle: "随时联系我",
    value: profileLinks.email,
    href: `mailto:${profileLinks.email}`,
    gradient: "from-emerald-400 to-cyan-400",
    bgGradient: "from-emerald-500/10 to-cyan-500/10",
    borderColor: "border-emerald-500/20",
    emoji: "📧",
  },
  {
    icon: <Github className="w-7 h-7" />,
    title: "GitHub",
    subtitle: "查看我的代码",
    value: "DearJohn-lx",
    href: profileLinks.github,
    gradient: "from-violet-400 to-purple-400",
    bgGradient: "from-violet-500/10 to-purple-500/10",
    borderColor: "border-violet-500/20",
    emoji: "💻",
  },
  {
    icon: <ExternalLink className="w-7 h-7" />,
    title: "博客",
    subtitle: "在线访问",
    value: "DearJohn-lx.github.io",
    href: profileLinks.blog,
    gradient: "from-amber-400 to-orange-400",
    bgGradient: "from-amber-500/10 to-orange-500/10",
    borderColor: "border-amber-500/20",
    emoji: "🌐",
  },
];

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="contact" className="py-24 sm:py-32 relative overflow-hidden" ref={ref}>
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/30 via-transparent to-muted/30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50rem] h-[50rem] bg-gradient-to-br from-emerald-400/5 via-cyan-400/3 to-amber-400/5 rounded-full blur-3xl animate-morph" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ delay: 0.1, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-rose-500/10 to-amber-500/10 border border-rose-500/20 text-sm font-medium text-rose-500 mb-4"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            联系我
          </motion.span>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight mb-4">
            保持<span className="gradient-text">联系</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            无论是技术交流、项目合作，还是随意聊聊，都欢迎联系我 🤝
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contactItems.map((item, i) => (
            <motion.a
              key={item.title}
              href={item.href}
              target={item.href.startsWith("mailto") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
              initial={{ y: 60, opacity: 0, scale: 0.9 }}
              animate={inView ? { y: 0, opacity: 1, scale: 1 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.1 * i,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative"
            >
              {/* Hover glow */}
              <div className={`absolute -inset-0.5 bg-gradient-to-r ${item.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-700`} />

              <div className={`relative flex flex-col items-center p-8 rounded-2xl border ${item.borderColor} bg-card overflow-hidden transition-all duration-500 group-hover:border-transparent group-hover:shadow-2xl group-hover:-translate-y-2 text-center`}>
                {/* Top gradient bar */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Shimmer */}
                <div className="absolute inset-0 shine-effect rounded-2xl pointer-events-none" />

                {/* Floating emoji */}
                <motion.span
                  className="absolute top-4 right-4 text-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  {item.emoji}
                </motion.span>

                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.bgGradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300 ${item.borderColor}`}>
                  <div className={`text-transparent bg-clip-text bg-gradient-to-r ${item.gradient}`}>
                    {item.icon}
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground mb-2">{item.subtitle}</p>
                <p className="text-sm text-muted-foreground break-all font-mono">
                  {item.value}
                </p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-center mt-14"
        >
          <Button
            size="lg"
            className="bg-gradient-to-r from-emerald-500 via-cyan-500 to-amber-500 hover:from-emerald-400 hover:via-cyan-400 hover:to-amber-400 text-white gap-2 rounded-full px-10 shadow-xl shadow-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-105 animate-gradient-shift bg-[length:200%_200%]"
            asChild
          >
            <a href={`mailto:${profileLinks.email}`}>
              <Send className="w-4 h-4" />
              给我发邮件
              <Heart className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
