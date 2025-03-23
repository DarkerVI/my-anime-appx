"use client"; // هذا الملف يعمل على جانب العميل

import "./globals.css";
import NProgress from "nprogress";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import "nprogress/nprogress.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = () => NProgress.start();
    const handleRouteComplete = () => NProgress.done();
    const handleRouteError = () => NProgress.done();

    // إضافة مستمعات للأحداث
    window.addEventListener("routeChangeStart", handleRouteChange);
    window.addEventListener("routeChangeComplete", handleRouteComplete);
    window.addEventListener("routeChangeError", handleRouteError);

    return () => {
      // إزالة المستمعات عند إلغاء التثبيت
      window.removeEventListener("routeChangeStart", handleRouteChange);
      window.removeEventListener("routeChangeComplete", handleRouteComplete);
      window.removeEventListener("routeChangeError", handleRouteError);
    };
  }, [pathname, router]);

  return (
    <html lang="ar">
      <body>{children}</body>
    </html>
  );
}