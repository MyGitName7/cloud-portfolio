// components/NavLink.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{ href: string }>;

export default function NavLink({ href, children }: Props) {
  const { pathname } = useRouter();
  const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
  return (
    <Link
      href={href}
      className={
        "rounded-lg px-3 py-2 text-sm font-medium transition " +
        (isActive
          ? "bg-slate-900 text-white"
          : "text-slate-700 hover:bg-slate-100")
      }
    >
      {children}
    </Link>
  );
}
