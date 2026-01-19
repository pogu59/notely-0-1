"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BarChart,
  MessageSquare,
  User,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { icon: LayoutDashboard, label: "홈", id: "dash" },
  { icon: BarChart, label: "통계", id: "stats" },
  { icon: MessageSquare, label: "메시지", id: "msg" },
  { icon: User, label: "프로필", id: "profile" },
  { icon: Settings, label: "설정", id: "settings" },
];

export default function BottomNav({
  onlyMobile = true,
}: {
  onlyMobile?: boolean;
}) {
  const [activeTab, setActiveTab] = useState("dash");

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-around bg-slate-950/90 px-4 pb-4 backdrop-blur-lg border-t border-slate-800",
        // onlyMobile이 true이면 md(768px) 이상에서 숨김
        onlyMobile && "md:hidden",
      )}
    >
      {menuItems.map((item) => {
        const isActive = activeTab === item.id;

        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="relative flex flex-col items-center justify-center gap-1 h-full w-full"
          >
            {/* 상단 인디케이터 바 */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  layoutId="bottom-active-pill"
                  className="absolute -top-2 h-1 w-12 rounded-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.8)]"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </AnimatePresence>

            {/* 아이콘 및 라벨 */}
            <motion.div
              animate={{
                scale: isActive ? 1.1 : 1,
                y: isActive ? -2 : 0,
              }}
              className={cn(
                "relative z-10 flex flex-col items-center",
                isActive ? "text-indigo-400" : "text-slate-500",
              )}
            >
              <item.icon size={24} />
              <span className="text-[10px] font-medium mt-1">{item.label}</span>
            </motion.div>

            {/* 배경 강조 효과 */}
            {isActive && (
              <motion.div
                layoutId="active-bg"
                className="absolute inset-x-1 inset-y-2 z-0 rounded-2xl bg-indigo-500/10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        );
      })}
    </nav>
  );
}
