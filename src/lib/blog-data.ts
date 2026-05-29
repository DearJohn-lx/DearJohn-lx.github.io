import { recipeContent } from "./recipe-content";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  readTime: number;
  tags: string[];
  category: string;
  coverGradient: string;
  coverImage?: string;
  content?: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "7",
    title: "独家菜谱",
    slug: "exclusive-recipes",
    excerpt:
      "家传独家菜谱合集：炒面、臊子面、麻婆豆腐、酸菜鱼、爆炒排骨……17 道拿手好菜，从面条到硬菜一网打尽。",
    date: "2025-05-29",
    readTime: 15,
    tags: ["菜谱", "家常菜", "做饭"],
    category: "生活",
    coverGradient: "from-orange-400 to-rose-500",
    coverImage: "/recipe-cover.jpg",
    content: recipeContent,
  },
];

export const skills: Skill[] = [
  { name: "TypeScript", icon: "🔷", level: 90, category: "语言" },
  { name: "React", icon: "⚛️", level: 88, category: "框架" },
  { name: "Next.js", icon: "▲", level: 85, category: "框架" },
  { name: "Node.js", icon: "🟢", level: 82, category: "运行时" },
  { name: "Tailwind CSS", icon: "🎨", level: 92, category: "样式" },
  { name: "Docker", icon: "🐳", level: 75, category: "运维" },
  { name: "Git", icon: "📦", level: 88, category: "工具" },
  { name: "Prisma", icon: "◆", level: 78, category: "数据库" },
  { name: "PostgreSQL", icon: "🐘", level: 76, category: "数据库" },
  { name: "Linux", icon: "🐧", level: 80, category: "运维" },
  { name: "Python", icon: "🐍", level: 70, category: "语言" },
  { name: "Figma", icon: "🎯", level: 65, category: "设计" },
];

export const profileLinks = {
  github: "https://github.com/DearJohn-lx",
  email: "3087001736@qq.com",
  blog: "https://DearJohn-lx.github.io",
};
