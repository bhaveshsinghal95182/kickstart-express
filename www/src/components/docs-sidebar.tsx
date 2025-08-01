"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

const sidebarNavItems = [
  {
    title: "Getting Started",
    href: "/docs/getting-started",
  },
  {
    title: "CLI Reference", 
    href: "/docs/cli-reference",
  },
  {
    title: "Usage Examples",
    href: "/docs/examples",
  },
  {
    title: "Project Templates",
    href: "/docs/templates",
  },
  {
    title: "API Reference",
    href: "/docs/api-reference",
  },
  {
    title: "Contributing",
    href: "/docs/contributing",
  },
  {
    title: "FAQ",
    href: "/docs/faq",
  },
]

export function DocsSidebar() {
  const pathname = usePathname()

  return (
    <div className="w-full">
      <div className="p-8">
        <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
          Documentation
        </h4>
        <div className="grid grid-flow-row auto-rows-max text-sm">
          {sidebarNavItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "group flex w-full items-center rounded-md border border-transparent px-2 py-1 hover:underline",
                pathname === item.href
                  ? "font-medium text-foreground"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}