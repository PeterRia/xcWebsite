import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "某某大学某某学院",
  description:
    "某某大学某某学院官网首页，包含新闻、通知、教学科研、新院风采和快速链接等模块。",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
