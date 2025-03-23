import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // تأكد من تغطية جميع الملفات
  ],
  theme: {
    extend: {}, // يمكنك تمديد إعدادات Tailwind هنا
  },
  plugins: [], // يمكنك إضافة إضافات Tailwind هنا
};

export default config;