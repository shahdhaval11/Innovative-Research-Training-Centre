import type { Metadata } from "next";
import ReduxProvider from "@/lib/redux/provider";

export const metadata: Metadata = {
  title: {
    default: "Admin",
    template: "%s | NanoNova Admin",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return <ReduxProvider>{children}</ReduxProvider>;
}
