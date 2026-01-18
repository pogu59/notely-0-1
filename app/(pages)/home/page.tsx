"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="bg-gray-200 w-dvw h-dvw">
      <div
        className="bg-white inline-block rounded-xl border border-gray-400"
        onClick={() => {
          router.push("/login");
        }}
      >
        로그인
      </div>
      <div
        className="bg-white inline-block rounded-xl border border-gray-400"
        onClick={() => {
          router.push("/login");
        }}
      >
        로그인
      </div>
      <div
        className="bg-white inline-block rounded-xl border border-gray-400"
        onClick={() => {
          router.push("/login");
        }}
      >
        로그인
      </div>
    </div>
  );
}
