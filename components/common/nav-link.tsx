"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

const NavLink = ({ children, href, className }: Props) => {
    const pathName = usePathname();
    const isActive = pathName === href || (pathName !="/" && pathName.startsWith(href));
  return (
    <Link

      href={href}
      className={cn(
        "transition-colors text-sm duration-200 text-gray-600 hover:text-rose-500",
        className,
        isActive && "text-red-500"
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
