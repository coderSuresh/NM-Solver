"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Calculator } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"

export default function Navbar() {
    const pathname = usePathname()

    const navItems = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About" },
    ]

    return (
        <header className="sticky top-0 z-50 px-5 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 mx-auto items-center">
                <div className="mr-4 flex">
                    <Link href="/" className="mr-6 flex items-center space-x-2">
                        <Calculator className="h-6 w-6" />
                        <span className="font-bold text-xl hidden sm:inline-block">NM Solver</span>
                    </Link>
                    <nav className="flex items-center space-x-6 text-sm font-medium">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={cn(
                                    "transition-colors hover:text-foreground/80",
                                    pathname === item.href ? "text-foreground" : "text-foreground/60",
                                )}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeToggle />
                </div>
            </div>
        </header>
    )
}

