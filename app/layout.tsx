import type { ReactNode } from "react";

// Required because the real layout (with <html>/<body>) lives at app/[locale]/layout.tsx.
// Next.js still requires a root layout to exist; this is a pass-through.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
