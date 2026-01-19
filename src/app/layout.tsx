import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/lib/query-provider";
import { AuthProvider } from "@/components/auth/auth-provider";
import { AuthGuard } from "@/components/auth/auth-guard";
import { Toaster } from "@/components/ui/toaster";
import { ErrorBoundary } from "@/components/error-boundary";

export const metadata: Metadata = {
  title: "Rabbit Todo - Task Management",
  description: "A modern task management application with Jira-style time tracking",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorBoundary>
          <QueryProvider>
            <AuthProvider>
              <AuthGuard>
                {children}
              </AuthGuard>
            </AuthProvider>
          </QueryProvider>
          <Toaster />
        </ErrorBoundary>
      </body>
    </html>
  );
}
