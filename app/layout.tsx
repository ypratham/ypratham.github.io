import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ThemeProvider from "@/components/ThemeProvider";
import ThemeToaster from "@/components/ThemeToaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pratham Yadav",
  description: "Software Engineer",
  appleWebApp: {
    title: "PRATHAM",
    statusBarStyle: "black-translucent",
    capable: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <TooltipProvider>
            <Header />
            <main className="min-h-[calc(100vh-3.5rem)]">{children}</main>
            <Footer />
          </TooltipProvider>
          <ThemeToaster />
        </ThemeProvider>
        <Analytics />
        <Script id="clarity">
          {` (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "w5d7wb5v93");`}
        </Script>
      </body>
    </html>
  );
}
