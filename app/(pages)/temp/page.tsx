"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Settings,
  User,
  MessageSquare,
  BarChart,
  LogOut,
  ChevronLeft,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

// 1. 애니메이션 설정 (Variants)
const navVariants = {
  expanded: { width: "260px" },
  collapsed: { width: "80px" },
};

const containerVariants = {
  show: {
    transition: { staggerChildren: 0.05 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dash" },
  { icon: BarChart, label: "Analytics", id: "stats" },
  { icon: MessageSquare, label: "Messages", id: "msg" },
  { icon: User, label: "Profile", id: "profile" },
  { icon: Settings, label: "Settings", id: "settings" },
];

export default function SideNav() {
  const [isExpanded, setIsExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState("dash");

  return (
    <motion.aside
      initial={false}
      variants={navVariants}
      animate={isExpanded ? "expanded" : "collapsed"}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="relative flex flex-col h-dvh bg-slate-950 text-slate-300 p-4 shadow-2xl"
    >
      {/* 토글 버튼 */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute -right-3 top-12 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-indigo-500 text-white hover:bg-indigo-400 transition-colors"
      >
        {isExpanded ? <ChevronLeft size={14} /> : <Menu size={14} />}
      </button>

      {/* 로고 영역 (Layout 애니메이션 활용) */}
      <div className="mb-10 flex h-10 items-center gap-3 px-2 overflow-hidden">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600">
          <div className="h-5 w-5 rounded-full border-2 border-white" />
        </div>
        <AnimatePresence>
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="text-xl font-bold tracking-tight text-white whitespace-nowrap"
            >
              NOTELY
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* 메인 메뉴 (Stagger & Active Indicator) */}
      <motion.nav
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="flex flex-1 flex-col gap-2"
      >
        {menuItems.map((item) => (
          <motion.div
            key={item.id}
            variants={itemVariants}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "relative flex h-12 cursor-pointer items-center rounded-xl px-3 transition-colors",
              activeTab === item.id ? "text-white" : "hover:bg-slate-900",
            )}
          >
            {/* 2. Active Indicator (Shared Layout) */}
            {activeTab === item.id && (
              <motion.div
                layoutId="active-pill"
                className="absolute inset-0 z-0 rounded-xl bg-indigo-600/20 border-l-2 border-indigo-500"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}

            <item.icon size={22} className="relative z-10 shrink-0" />

            <AnimatePresence>
              {isExpanded && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  className="relative z-10 ml-4 overflow-hidden whitespace-nowrap font-medium"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.nav>

      {/* 하단 푸터 (Hover Effects) */}
      <div className="mt-auto border-t border-slate-800 pt-4">
        <motion.div
          whileHover={{ x: 5 }}
          className="flex h-12 cursor-pointer items-center rounded-xl px-3 text-slate-500 hover:text-red-400"
        >
          <LogOut size={22} className="shrink-0" />
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="ml-4 font-medium"
            >
              Logout
            </motion.span>
          )}
        </motion.div>
      </div>
    </motion.aside>
  );
}
