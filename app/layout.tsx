import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Video Feed - Test HoTrongHao 412",
  description: "Vertical scroll video feed app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
