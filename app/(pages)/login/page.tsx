"use client";

import { Input } from "@/components/ui/input";
import AppShell from "@/components/display/appshell";

export default function LoginPage() {
  return (
    <AppShell className="flex flex-col items-center space-y-10">
      <div className="text-5xl">로그인</div>
    
      <div className="flex flex-col">
        <Input placeholder="이메일" />
        <Input placeholder="이름" />
        <Input placeholder="비밀번호" />
      </div>
    </AppShell>
  );
}
