"use client";

import { AlignCenter, MoonIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";

function Header({ user,profileInfo }) {
  const {theme ,setTheme} =useTheme();
  const menuItems = [
    {
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "Feed",
      path: "/feed",
      show: user,
    },
    {
      label: "Login",
      path: "/sign-in",
      show: !user,
    },
    {
      label: "Register",
      path: "/sign-up",
      show: !user,
    },
    {
      label: "Activity",
      path: "/activity",
      show: profileInfo?.role === 'candidate',
    },
    {
      label: "Companies",
      path: "/companies",
      show: profileInfo?.role === 'candidate',
    },
    {
      label: "Jobs",
      path: "/jobs",
      show: profileInfo,
    },
    {
      label: "Membership",
      path: "/membership",
      show: profileInfo,
    },
    {
      label: "Account",
      path: "/account",
      show: profileInfo,
    },
    
  ];

  return (
    <div>
      <header className="flex h-16 w-full shrink-0 items-center ">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="lg:hidden">
              <AlignCenter className="h-6 w-6" />
              <span className="sr-only">Toggle Navigation</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="top">
            <Link className="mr-6 hidden lg:flex" href="#">
              <h3 className="font-extrabold">WORk WAVe</h3>
            </Link>
            <div className="grid gap-2 py-8 ">
              {menuItems.map((menuItem) =>
                menuItem.show ? (
                  <Link
                    key={menuItem.path}
                    href={menuItem.path}
                    className="flex w-full items-center justify-center py-3 text-lg font-medium hover:text-cyan-500 hover:underline "
                  >
                    {menuItem.label}
                  </Link>
                ) : null
              )}
              <MoonIcon
                className="flex cursor-pointer items-center justify-center mb-4"
                fill={theme === "dark" ? "light" : "dark"}
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              />
              <UserButton afterSignOutUrl="/" />
            </div>
          </SheetContent>
        </Sheet>
        <Link className="hidden lg:flex mr-6" href="/">
          <h3 className="font-medium text-cyan-900 dark:text-gray-200 dark:hover:text-cyan-600 hover:text-cyan-600 text-5xl ">
          〔Work wavE〕
          </h3>
        </Link>
        <nav className="ml-auto hidden lg:flex gap-6 items-center">
          {menuItems.map((menuItem) =>
            menuItem.show ? (
              <Link
                key={menuItem.path}
                href={menuItem.path}
                onClick={() => sessionStorage.removeItem("filterParams")}
                className="group inline-flex h-9 w-max items-center rounded-md bg-gray-300 dark:bg-gray-300 px-7 py-5 text-md font-semibold text-gray-600 dark:text-gray-900 dark:hover:text-cyan-600 hover:text-cyan-600 hover:bg-gray-200 hover:underline hover:scale-105 transition-transform border border-2 border-cyan-600"
                >
                {menuItem.label}
              </Link>
            ) : null
          )}
          <MoonIcon
            className="cursor-pointer"
            fill={theme === "dark" ? "light" : "dark"}
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          />
          <UserButton afterSignOutUrl="/" />
        </nav>
      </header>
    </div>
  );
}

export default Header;
