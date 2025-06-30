import { Footer } from "@/components/navigation/Footer";
import Navbar from "@/components/navigation/Navbar";

export const dynamic = "force-dynamic";

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
  return <><Navbar />{children}<Footer/></>;
}
