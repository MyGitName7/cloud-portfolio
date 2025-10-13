// components/Layout.tsx
import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

type Props = PropsWithChildren<{}>;

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-dvh bg-white text-slate-900">
      <Header />
      {/* Page content */}
      <main className="mx-auto max-w-6xl px-4 md:px-6">{children}</main>
      <Footer />
    </div>
  );
}
