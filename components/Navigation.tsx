"use client";

import { useState } from "react";

type NavItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  {
    id: "home",
    label: "Trang chủ",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
      </svg>
    ),
  },
  {
    id: "explore",
    label: "Khám phá",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    id: "profile",
    label: "Hồ sơ",
    icon: (
      <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor">
        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
      </svg>
    ),
  },
];

export default function Navigation() {
  const [active, setActive] = useState("home");

  return (
    <>
      {/* Desktop: left sidebar */}
      <nav className="hidden md:flex flex-col items-center justify-center gap-2 w-20 h-dvh bg-black border-r border-white/10 fixed left-0 top-0 z-50">
        <div className="mb-6">
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="black">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex flex-col items-center gap-1 px-3 py-3 rounded-xl w-full mx-2 transition-colors ${
              active === item.id
                ? "text-white bg-white/10"
                : "text-white/50 hover:text-white/80 hover:bg-white/5"
            }`}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile: bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around bg-black/90 backdrop-blur-sm border-t border-white/10 h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
              active === item.id ? "text-white" : "text-white/40"
            }`}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
}
