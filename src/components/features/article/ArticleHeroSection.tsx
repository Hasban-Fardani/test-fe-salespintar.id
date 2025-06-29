"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import Navbar from "@/components/navigation/Navbar";

const categories = ["Design", "Tech", "UI/UX", "Business"];

export default function ArticleBanner() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [search, setSearch] = useState(searchParams.get("search") || "");
    const [category, setCategory] = useState(searchParams.get("category") || "");

    useEffect(() => {
        const handler = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (search) params.set("search", search);
            else params.delete("search");
            router.push(`/articles?${params.toString()}`);
        }, 300);

        return () => clearTimeout(handler);
    }, [search, searchParams, router]);


    const handleCategoryChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value) params.set("category", value);
        else params.delete("category");
        router.push(`/articles?${params.toString()}`);
        setCategory(value);
    };

    return (
        <>
            <section className="relative w-full min-h-[500px] py-16 pt-6 px-4 text-white text-center bg-[url('/images/young-male-designer-using-graphics-tablet-while-working-with-com.jpg')] bg-cover bg-center">
                <Navbar variant="transparent" className="absolute z-10 hidden md:block" />
                <div className="absolute inset-0 bg-blue-600/70"></div>

                {/* Content container */}
                <div className="relative z-10 max-w-4xl mx-auto pt-20">
                    {/* Small label above title */}
                    <div className="mb-4">
                        <span className="inline-block px-3 py-1 text-sm font-medium bg-white/20 backdrop-blur-sm rounded-full">
                            Blog genzet
                        </span>
                    </div>

                    {/* Main title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                        The Journal : Design Resources,<br />
                        Interviews, and Industry News
                    </h1>

                    <p className="text-xl md:text-2xl mb-12 font-light">
                        Your daily dose of design insights!
                    </p>

                    <div className="mt-8 max-w-2xl mx-auto">
                        <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                            {/* Category dropdown */}
                            <div className="relative flex-shrink-0 sm:w-48">
                                <select
                                    className="w-full h-12 rounded-md px-4 text-gray-700 bg-white border-0 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    value={category}
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                >
                                    <option value="">Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                {/* Custom dropdown arrow */}
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <ChevronDown className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>

                            {/* Search input */}
                            <div className="relative flex-1">
                                <input
                                    type="search"
                                    placeholder="Search articles"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="w-full h-12 rounded-md px-4 pr-10 text-gray-700 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {/* Search icon */}
                                <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                    <Search className="w-5 h-5 text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
