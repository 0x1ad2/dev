import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/mode-toggle";
import { PDFDownloadButton } from "@/components/pdf-download-button";
import Link from "next/link";
import fs from "fs/promises";
import path from "path";
import "./globals.css";
import "./layout.css";

export default async function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
        >
          <div className="min-h-screen bg-background text-foreground">
            <header className="border-b">
              <div className="container mx-auto flex items-center justify-between p-4">
                <Link href="/" className="text-2xl font-bold">
                  My Resume
                </Link>
                <div className="flex items-center space-x-4">
                  <AvailabilityStatus />
                  <ModeToggle />
                </div>
              </div>
            </header>
            <main className="container mx-auto py-8">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

function AvailabilityStatus() {
  return (
    <div className="flex items-center space-x-2">
      <div
        className="h-3 w-3 rounded-full bg-green-500"
        aria-hidden="true"
      ></div>
      <span>Available for hire</span>
    </div>
  );
}
