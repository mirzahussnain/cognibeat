"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTheme } from "next-themes";
import {
  Menu01Icon,
  Cancel01Icon,
  DashboardSquare01Icon,
  AlbumIcon,
  Moon01Icon,
  Sun01Icon,
  UserCircleIcon,
  Login01Icon,
} from "@hugeicons/core-free-icons";
import { Logo } from "./logo";

// ── Animation Variants ──────────────────────────────────────────────────────

const navbarVariants: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut", delay: 0.15 + i * 0.08 },
  }),
};

const iconSwapVariants: Variants = {
  initial: { opacity: 0, scale: 0.5, rotate: -30 },
  animate: { opacity: 1, scale: 1, rotate: 0, transition: { duration: 0.25, ease: "easeOut" } },
  exit:    { opacity: 0, scale: 0.5, rotate: 30,  transition: { duration: 0.15, ease: "easeIn" } },
};

const mobileMenuVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: {
    opacity: 1,
    height: "auto",
    transition: { duration: 0.25, ease: "easeInOut" },
  },
  exit: {
    opacity: 0,
    height: 0,
    transition: { duration: 0.2, ease: "easeInOut" },
  },
};

const mobileItemVariants: Variants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.25, ease: "easeOut", delay: i * 0.07 },
  }),
};

// ── NavLink Component ────────────────────────────────────────────────────────

function NavLink({
  href,
  icon,
  label,
  index,
  onClick,
}: {
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  index: number;
  onClick?: () => void;
}) {
  return (
    <motion.div
      custom={index}
      variants={navItemVariants}
      initial="hidden"
      animate="visible"
      className="relative"
    >
      <Link
        href={href}
        onClick={onClick}
        aria-label={`Navigate to ${label}`}
        title={label}
        className="group flex items-center gap-2 text-[15px] font-medium text-muted-foreground transition-colors duration-200 hover:text-foreground"
      >
        <HugeiconsIcon
          icon={icon}
          size={19}
          strokeWidth={1.5}
          className="transition-transform duration-200 group-hover:scale-110"
        />
        <span className="relative">
          {label}
          {/* Animated underline on hover */}
          <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-linear-to-r from-primary to-secondary transition-all duration-300 group-hover:w-full" />
        </span>
      </Link>
    </motion.div>
  );
}

// ── Navbar ──────────────────────────────────────────────────────────────────

export function Navbar() {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSignedIn] = useState(false);

  // Set mounted state on first client-side render to handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const currentTheme = mounted ? (theme === "system" ? systemTheme : theme) : "light";
  const isDarkMode = currentTheme === "dark";

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.header
      variants={navbarVariants}
      initial="hidden"
      animate="visible"
      role="banner"
      aria-label="CogniBeat site navigation"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-border/50 bg-background/50 backdrop-blur-md"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div
        className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:h-16 sm:px-6"
      >
        {/* ── Brand Logo ─────────────────────────────────────────── */}
        <motion.div
          custom={0}
          variants={navItemVariants}
          initial="hidden"
          animate="visible"
        >
          <Link
            href="/"
            aria-label="CogniBeat — Go to homepage"
            title="CogniBeat Home"
            className="flex items-center gap-2 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-md"
          >
            <Logo className="h-7 w-auto sm:h-8" aria-hidden="true" />
            <span className="text-lg font-bold font-heading tracking-tight text-transparent bg-clip-text bg-linear-to-r from-primary to-secondary sm:text-xl">
              CogniBeat
            </span>
          </Link>
        </motion.div>

        {/* ── Right: Navigation & Actions ─────────────────────────── */}
        <div className="flex items-center gap-2 sm:gap-5">

          {/* Desktop Nav Items - Hidden on Mobile */}
          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Main navigation"
          >
            <NavLink href="#" icon={DashboardSquare01Icon} label="Setup"   index={1} />
            <NavLink href="#" icon={AlbumIcon}              label="History" index={2} />
          </nav>

          {/* Separator - Hidden on Mobile */}
          <div
            className="hidden h-6 w-px bg-border/50 md:block"
            role="separator"
            aria-hidden="true"
          />

          {/* Actions - Hidden on Mobile */}
          <div className="hidden items-center gap-1 sm:gap-2 md:flex">

            {/* Theme Toggle */}
            <motion.button
              custom={3}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              onClick={toggleTheme}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
              aria-label={mounted ? (isDarkMode ? "Switch to light mode" : "Switch to dark mode") : "Theme toggle"}
              title={mounted ? (isDarkMode ? "Switch to light mode" : "Switch to dark mode") : "Theme toggle"}
            >
              <AnimatePresence mode="wait">
                {mounted && (
                  isDarkMode ? (
                  <motion.span
                    key="moon"
                    variants={iconSwapVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute"
                  >
                    <HugeiconsIcon icon={Moon01Icon} size={20} strokeWidth={1.5} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="sun"
                    variants={iconSwapVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute"
                  >
                    <HugeiconsIcon icon={Sun01Icon} size={20} strokeWidth={1.5} />
                  </motion.span>
                ))}
              </AnimatePresence>
            </motion.button>

            {/* Auth Button */}
            <motion.button
              custom={4}
              variants={navItemVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="flex cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border border-border bg-transparent px-3 py-1.5 text-[15px] transition-all duration-200 hover:border-primary/50 hover:bg-muted/50 sm:px-5 sm:py-2"
              aria-label={isSignedIn ? "Open your profile" : "Sign in to CogniBeat"}
              title={isSignedIn ? "Your profile" : "Sign in"}
            >
              <AnimatePresence mode="wait">
                {isSignedIn ? (
                  <motion.span
                    key="profile"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <HugeiconsIcon icon={UserCircleIcon} size={19} strokeWidth={1.5} className="text-secondary" />
                    <span className="font-medium text-foreground">Profile</span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="signin"
                    className="flex items-center gap-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <HugeiconsIcon icon={Login01Icon} size={19} strokeWidth={1.5} className="text-primary" />
                    <span className="font-medium text-muted-foreground">Sign In</span>
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>

          {/* Mobile Hamburger - Always Visible below md threshold */}
          <motion.button
            custom={5}
            variants={navItemVariants}
            initial="hidden"
            animate="visible"
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground md:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            title={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <AnimatePresence mode="wait">
              {isOpen ? (
                <motion.span
                  key="close"
                  variants={iconSwapVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <HugeiconsIcon icon={Cancel01Icon} size={22} strokeWidth={1.8} />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  variants={iconSwapVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <HugeiconsIcon icon={Menu01Icon} size={22} strokeWidth={1.8} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* ── Mobile Menu ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            role="navigation"
            aria-label="Mobile navigation menu"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden border-t border-border bg-background shadow-2xl md:hidden"
          >
            <div className="flex flex-col gap-4 px-5 py-8">

              {/* Setup */}
              <motion.div custom={0} variants={mobileItemVariants} initial="hidden" animate="visible">
                <Link
                  href="#"
                  onClick={closeMenu}
                  aria-label="Navigate to Setup"
                  title="Setup"
                  className="flex items-center gap-3 text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <HugeiconsIcon icon={DashboardSquare01Icon} size={21} strokeWidth={1.5} />
                  <span>Setup</span>
                </Link>
              </motion.div>

              {/* History */}
              <motion.div custom={1} variants={mobileItemVariants} initial="hidden" animate="visible">
                <Link
                  href="#"
                  onClick={closeMenu}
                  aria-label="Navigate to History"
                  title="History"
                  className="flex items-center gap-3 text-lg font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  <HugeiconsIcon icon={AlbumIcon} size={21} strokeWidth={1.5} />
                  <span>History</span>
                </Link>
              </motion.div>

              <motion.hr
                custom={2}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
                className="border-border/50"
              />

              {/* Theme Row */}
              <motion.div custom={3} variants={mobileItemVariants} initial="hidden" animate="visible">
                <button
                  onClick={toggleTheme}
                  aria-label={mounted ? (isDarkMode ? "Switch to light mode" : "Switch to dark mode") : "Theme Toggle"}
                  title={mounted ? (isDarkMode ? "Switch to light mode" : "Switch to dark mode") : "Theme Toggle"}
                  className="flex w-full cursor-pointer items-center justify-between"
                >
                  <div className="flex items-center gap-3 text-lg font-medium text-muted-foreground">
                    <AnimatePresence mode="wait">
                      {mounted && (
                        isDarkMode ? (
                          <motion.span key="moon-m" variants={iconSwapVariants} initial="initial" animate="animate" exit="exit">
                            <HugeiconsIcon icon={Moon01Icon} size={21} strokeWidth={1.5} />
                          </motion.span>
                        ) : (
                          <motion.span key="sun-m" variants={iconSwapVariants} initial="initial" animate="animate" exit="exit">
                            <HugeiconsIcon icon={Sun01Icon} size={21} strokeWidth={1.5} />
                          </motion.span>
                        )
                      )}
                    </AnimatePresence>
                    <span>Theme</span>
                  </div>
                  {/* Toggle pill */}
                  <div
                    className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${mounted && isDarkMode ? "bg-primary/30" : "bg-muted"}`}
                  >
                    <motion.div
                      animate={{ x: mounted && isDarkMode ? 22 : 2 }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      className="absolute top-1 h-4 w-4 rounded-full bg-foreground shadow-sm"
                    />
                  </div>
                </button>
              </motion.div>

              {/* Auth */}
              <motion.button
                custom={4}
                variants={mobileItemVariants}
                initial="hidden"
                animate="visible"
                onClick={closeMenu}
                whileTap={{ scale: 0.97 }}
                aria-label={isSignedIn ? "Open your profile" : "Sign in to CogniBeat"}
                title={isSignedIn ? "Your profile" : "Sign in"}
                className="flex w-full cursor-pointer items-center justify-center gap-3 rounded-full border border-border bg-transparent px-4 py-3 text-lg font-semibold transition-colors hover:border-primary/50 hover:bg-muted/50"
              >
                {isSignedIn ? (
                  <>
                    <HugeiconsIcon icon={UserCircleIcon} size={21} strokeWidth={1.5} className="text-secondary" />
                    <span>Profile</span>
                  </>
                ) : (
                  <>
                    <HugeiconsIcon icon={Login01Icon} size={21} strokeWidth={1.5} className="text-primary" />
                    <span>Sign In</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
