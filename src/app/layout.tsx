import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/blog/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "LX | 个人博客",
  description:
    "LX 的个人博客 — 代码即诗，用技术书写世界。分享前端开发、TypeScript、React、Next.js 等技术文章。",
  keywords: ["LX", "个人博客", "前端开发", "TypeScript", "React", "Next.js"],
  authors: [{ name: "LX" }],
  icons: {
    icon: "/avatar.png",
  },
  openGraph: {
    title: "LX | 个人博客",
    description: "代码即诗，用技术书写世界",
    url: "https://DearJohn-lx.github.io",
    siteName: "LX Blog",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoSerifSC.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
