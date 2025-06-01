import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "예쁘네 - AI 뷰티 컨시어지 플랫폼",
  description: "세상에 하나뿐인 당신만의 한국적 AI 코디네이터",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <main className="min-h-screen bg-gradient-to-b from-rose-50 to-white">
          {children}
        </main>
      </body>
    </html>
  );
}
