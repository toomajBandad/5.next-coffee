"use client";
import Link from "next/link";
import useBreadcrumbItems from "@/hooks/breadCrumbItemHook";

export default function Breadcrumb() {
  const items = useBreadcrumbItems();

  return (
    <nav className="text-sm text-black" aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {item.href ? (
              <Link
                href={item.href}
                className="text-black hover:underline transition duration-150"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-500">{item.label}</span>
            )}
            {index < items.length - 1 && (
              <span className="mx-2 text-gray-400">/</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}