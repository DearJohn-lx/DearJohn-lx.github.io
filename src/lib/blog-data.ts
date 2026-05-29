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
    content: `## 炒面（第一种）

- **食材**：上海青、龙椒、白菜丝、茄子、肉丝、面条
- **做法**：炒肉、茄子、上海青、龙椒、白菜丝，加入面条炒匀。

---

## 碱面

- **食材**：小芹菜、西红柿、土豆、萝卜、小葱、茄子
- **做法**：
  1. 萝卜、土豆用水煮熟。
  2. 炒小芹菜、茄子、西红柿、煮好的土豆和萝卜。

---

## 臊子面

- **食材**：豆腐、豆角（4根）、肉丁、韭菜、土豆（半个）、萝卜（半个）
- **做法**：炒肉丁、豆角和萝卜，加水，再加入土豆、韭菜、豆腐。

---

## 肘子行面

- **食材**：土豆、上海青（1颗）、蒜苗、大葱、海带片、木耳、腐竹、萝卜（1/4个）、胡萝卜（一小段）、香菇（3个）、平菇（1朵）

---

## 炖肉

- **做法**：
  1. 肉去腥：冷水下锅，煮至开锅。
  2. 加入姜片、辣椒段、花椒，高压锅压20分钟。

---

## 土豆丝

- **做法**：
  1. 土豆丝焯水。
  2. 加蒜末、葱丝、辣椒、盐、鸡精、十三香炒匀。

---

## 炸酱面

- **食材**：豆腐（1.5块）、肉馅（半斤）、蒜苔（4根）、小葱、酱（半包）
- **做法**：肉馅加葱姜末、水，再加蒜苔末、豆腐炒制成酱。

---

## 茄辣西

- **食材**：茄子（3个）、西红柿（1个）、辣椒（1个）
- **做法**：蒜炝锅，依次下茄子、西红柿、辣椒炒熟。

---

## 爆炒排骨

- **食材**：小排（2斤）、手擀粉（2袋）、洋葱、蒜苗、大葱段
- **做法**：先炒洋葱、蒜苗、大葱段，再加入排骨和手擀粉翻炒。

---

## 酸菜鱼

- **食材**：白菜、腌梭边鱼、豆芽、粉条、酸菜
- **做法**：
  1. 白菜切丝，豆芽备用。
  2. 锅中下酸菜、白菜丝、豆芽、粉条，最后放入鱼煮熟。

---

## 麻婆豆腐

- **食材**：豆腐（约3~4元钱量）、小葱
- **做法**：
  1. 豆腐煮2分钟捞出。
  2. 炒料，加水，下豆腐煮5分钟。
  3. 勾芡两次，撒小葱。

---

## 辣椒炒肉

- **食材**：辣椒（4个）、肉、蚝油、酱油、白糖、盐、十三香
- **做法**：
  1. 辣椒先单独炒一次盛出。
  2. 炒肉，加料汁、十三香，放辣椒，最后勾芡一次。

---

## 饺子馅

- **食材**：土豆（3个）、肉馅（半斤）、姜末、韭菜（半把）

---

## 油泼面

- **食材**：豆芽、菠菜、胡萝卜、小葱
- **调料**：辣椒面、十三香、鸡精、盐、蒜末、生抽
- **做法**：面条煮熟，放上食材和调料，热油泼香。

---

## 苦瓜炒肉

- **做法**：
  1. 苦瓜切片，加盐腌10分钟。
  2. 准备小米椒、蒜片、葱段。
  3. 先炒肉，再下小米椒、蒜片、葱，放苦瓜。
  4. 加蚝油、酱油、少许醋和糖，翻炒出锅。

---

## 炒面（第二种）

- **食材**：蒜、火腿肠（2根）、鸡蛋（4个）、菠菜、洋葱、豆芽、面条
- **做法**：
  1. 调汁：蚝油、蒜末、酱油、醋、菜籽油、酱油拌面。
  2. 先炒鸡蛋，再炒洋葱、火腿、豆芽、菠菜。
  3. 加入面条和调汁炒匀。

---

## 土豆炖鸡块

- **食材**：土豆（2个）、鸡腿（3个）、洋葱（半个）、小葱、蒜末
- **做法**：
  1. 腌鸡肉：用生抽、十三香、油、淀粉抓匀。
  2. 炒鸡肉、洋葱、土豆。
  3. 加生抽、半勺糖、蚝油，加水半碗，炖10分钟。
  4. 颜色不够可加辣椒面。

---

## 兰州炒面

- **步骤**：
  1. 煮面备用。
  2. 炒肉，加酱油、蒜、洋葱、辣椒面、十三香。
  3. 放入西红柿、蒜苔、青红椒，最后加入面条炒匀。`,
  },
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
    coverGradient: "from-violet-400 to-purple-600",
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
    coverGradient: "from-violet-500 to-fuchsia-600",
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
    coverGradient: "from-purple-400 to-violet-600",
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
    coverGradient: "from-violet-500 to-purple-700",
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
    coverGradient: "from-purple-500 to-violet-700",
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
    coverGradient: "from-fuchsia-500 to-violet-600",
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
