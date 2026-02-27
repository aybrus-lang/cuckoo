import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "🐦 Cuckoo",
  description: "Private shared moments",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#050505",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Global Brand Header */}
        <div
          style={{
            padding: "14px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "#050505",
            fontSize: 14,
            letterSpacing: "0.08em",
          }}
        >
          🐦 Cuckoo
        </div>

        {children}
      </body>
    </html>
  );
}
