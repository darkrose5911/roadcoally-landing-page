"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/drivers", label: "Drivers" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Header({ className = "" }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [indicatorStyle, setIndicatorStyle] = useState({});
  const [direction, setDirection] = useState("right");
  const navRef = useRef(null);
  const linksRef = useRef([]);

  const updateIndicator = (index, dir = "right") => {
    if (index === -1 || !linksRef.current[index]) {
      setIndicatorStyle({ opacity: 0 });
      return;
    }

    const link = linksRef.current[index];
    const nav = navRef.current;
    if (!link || !nav) return;

    const linkRect = link.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();

    setIndicatorStyle({
      left: linkRect.left - navRect.left,
      width: linkRect.width,
      opacity: 1,
      transform: dir === "left" ? "translateX(-4px)" : "translateX(4px)",
    });

    setTimeout(() => {
      setIndicatorStyle(prev => ({
        ...prev,
        transform: "translateX(0px)",
      }));
    }, 50);
  };

  useEffect(() => {
    const currentIndex = navLinks.findIndex(link => link.href === pathname);
    setActiveIndex(currentIndex);
    updateIndicator(currentIndex);
  }, [pathname]);

  const handleLinkHover = (index) => {
    const newDirection = index > activeIndex ? "right" : "left";
    setDirection(newDirection);
    updateIndicator(index, newDirection);
  };

  const handleNavLeave = () => {
    updateIndicator(activeIndex);
  };

  return (
    <header className={`sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${className}`}>
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-foreground">
              Roadcoally
            </span>
          </Link>
          <nav
            ref={navRef}
            className="relative flex items-center space-x-6 text-sm font-medium"
            onMouseLeave={handleNavLeave}
          >
            <div
              className="absolute bottom-0 h-0.5 bg-primary rounded-full transition-all duration-300 ease-out"
              style={indicatorStyle}
            />
            {navLinks.map((item, index) => (
              <Link
                key={item.href}
                ref={el => linksRef.current[index] = el}
                href={item.href}
                className={`relative py-2 transition-colors hover:text-foreground/80 ${
                  pathname === item.href
                    ? "text-foreground"
                    : "text-foreground/60"
                }`}
                onMouseEnter={() => handleLinkHover(index)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <Link href="/" className="flex items-center space-x-2 md:hidden">
              <span className="font-bold text-foreground">Roadcoally</span>
            </Link>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link href="/become-driver">Become a Driver</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/support">Support</Link>
            </Button>
          </nav>
        </div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pr-0">
            <SheetHeader>
              <SheetTitle>
                <Link
                  href="/"
                  className="flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="font-bold">Roadcoally</span>
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="flex flex-col space-y-3">
                {navLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-foreground/70 transition-colors hover:text-foreground ${
                      pathname === item.href ? "text-foreground font-medium" : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="flex flex-col space-y-3 pt-6">
                  <Button variant="ghost" asChild>
                    <Link href="/become-driver" onClick={() => setIsOpen(false)}>
                      Become a Driver
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/support" onClick={() => setIsOpen(false)}>
                      Support
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}