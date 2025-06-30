import { Footer } from "@/components/navigation/Footer";

export const dynamic = "force-dynamic";

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <>{children}<Footer/></>;
}
