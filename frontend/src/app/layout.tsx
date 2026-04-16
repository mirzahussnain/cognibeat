import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Outfit, Bodoni_Moda } from "next/font/google";
import "@/styles/globals.css";
import { ThemeProvider } from "@/shared/lib/providers/theme-provider";
import { ToastProvider } from "@/shared/lib/providers/toast-provider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const bodoni = Bodoni_Moda({
  variable: "--font-accent",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

export const metadata: Metadata = {
  title: "CogniBeat",
  description: "Context-Aware Deep Work Engine for high-focus professionals and students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} ${bodoni.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ToastProvider />
        </ThemeProvider>
      </body>
    </html>
  );
}