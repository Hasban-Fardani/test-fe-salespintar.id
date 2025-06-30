import Navbar from "@/components/navigation/Navbar";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Navbar />
            {children}
        </>
    )
}
