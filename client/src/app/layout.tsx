import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "DressRental - Thuê Váy Cao Cấp",
  description: "Cho thuê váy cao cấp cho mọi dịp đặc biệt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={GeistSans.className}>{children}</body>
    </html>
  );
}
