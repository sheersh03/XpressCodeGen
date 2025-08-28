import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ViaXpress — AI Code Generator",
  description: "Scaffold supplier integrations.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
