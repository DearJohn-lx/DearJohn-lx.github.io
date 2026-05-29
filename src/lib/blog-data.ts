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
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "用 Next.js 构建高性能个人博客",
    slug: "build-blog-with-nextjs",
    excerpt:
      "从零开始搭建一个基于 Next.js 的静态博客，涵盖 SSG、MDX 集成、主题切换等核心功能的实现细节。",
    date: "2025-03-15",
    readTime: 8,
    tags: ["Next.js", "React", "SSG"],
    category: "前端开发",
    coverGradient: "from-emerald-500 to-teal-600",
  },
  {
    id: "2",
    title: "TypeScript 高级类型体操实战",
    slug: "typescript-advanced-types",
    excerpt:
      "深入探索 TypeScript 的条件类型、映射类型和模板字面量类型，通过实际案例掌握类型编程的艺术。",
    date: "2025-03-02",
    readTime: 12,
    tags: ["TypeScript", "类型系统"],
    category: "前端开发",
    coverGradient: "from-amber-500 to-orange-600",
  },
  {
    id: "3",
    title: "Docker 容器化部署最佳实践",
    slug: "docker-deployment-best-practices",
    excerpt:
      "从 Dockerfile 编写到多阶段构建，再到 Docker Compose 编排，一篇搞定容器化部署的所有关键点。",
    date: "2025-02-20",
    readTime: 10,
    tags: ["Docker", "DevOps", "部署"],
    category: "后端 & 运维",
    coverGradient: "from-rose-500 to-pink-600",
  },
  {
    id: "4",
    title: "Tailwind CSS 响应式设计模式",
    slug: "tailwind-responsive-patterns",
    excerpt:
      "总结 Tailwind CSS 中常用的响应式设计模式，包括移动优先策略、容器查询和自适应排版技巧。",
    date: "2025-02-10",
    readTime: 6,
    tags: ["Tailwind CSS", "CSS", "响应式"],
    category: "前端开发",
    coverGradient: "from-violet-500 to-purple-600",
  },
  {
    id: "5",
    title: "Node.js 流式处理与背压控制",
    slug: "nodejs-stream-backpressure",
    excerpt:
      "深入理解 Node.js Stream 的工作原理，掌握背压机制在高并发场景下的关键作用与调优策略。",
    date: "2025-01-28",
    readTime: 15,
    tags: ["Node.js", "Stream", "性能优化"],
    category: "后端 & 运维",
    coverGradient: "from-cyan-500 to-sky-600",
  },
  {
    id: "6",
    title: "Git 工作流与团队协作指南",
    slug: "git-workflow-guide",
    excerpt:
      "从 Git Flow 到 Trunk-Based Development，对比不同工作流的优劣，找到最适合你团队的版本控制策略。",
    date: "2025-01-15",
    readTime: 7,
    tags: ["Git", "协作", "工程化"],
    category: "工程化",
    coverGradient: "from-lime-500 to-green-600",
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
