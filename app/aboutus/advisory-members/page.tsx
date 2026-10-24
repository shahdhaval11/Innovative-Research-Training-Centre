import type { Metadata } from "next";
import AdvisoryMembersPage from "@/modules/about/components/AdvisoryMembersPage";

export const metadata: Metadata = {
  title: "Our Advisory Members",
  description:
    "Meet the advisory members guiding NanoNova with their research, academic and industry expertise.",
};

export default function Page() {
  return <AdvisoryMembersPage />;
}
