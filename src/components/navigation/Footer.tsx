import Image from "next/image";

export function Footer() {
    return (
        <footer className="mt-6 flex flex-col md:flex-row h-24 w-full items-center justify-center bg-primary text-white gap-4">
            <Image
                src="/images/logo-ipsum-white.png"
                alt="Logo ipsum"
                width={120}
                height={80}
            />
            <p className="text-sm">
                © 2025 Blog genzet. All rights reserved.
            </p>
        </footer>
    )
}