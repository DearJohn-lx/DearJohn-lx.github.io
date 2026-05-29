"use client";

import { Navbar } from "@/components/blog/navbar";
import { Hero } from "@/components/blog/hero";
import { About } from "@/components/blog/about";
import { Posts } from "@/components/blog/posts";
import { Skills } from "@/components/blog/skills";
import { Contact } from "@/components/blog/contact";
import { Footer } from "@/components/blog/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Posts />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
