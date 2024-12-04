"use client";

/* eslint-disable @next/next/no-sync-scripts */
import { ToastProvider } from "@/components/toast/ToastProvider";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryclient = new QueryClient();
  return (
    <html lang="ko">
      <body>
        <QueryClientProvider client={queryclient}>
          <ToastProvider>{children}</ToastProvider>
          <ReactQueryDevtools />
        </QueryClientProvider>
        <script
          type="text/javascript"
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&libraries=services,clusterer`}
        ></script>
      </body>
    </html>
  );
}
