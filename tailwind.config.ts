// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        borderRadius: {
            'none': '0',
            'sm': '0.125rem',
            DEFAULT: '20px', // rounded 기본값
            'md': '0.375rem',
            'lg': '0.5rem',
            'full': '9999px',
            'large': '12px', // 새로운 사용자 정의 값 추가
        },
        colors: {
            primary: "#549387",
        },
    },
    },
    plugins: [],
};
export default config;