"use client";

import Image from "next/image"; 

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import Navbar from "@/components/navigation/Navbar";
import { useCategory } from "@/hooks/useCategories";

export default function ArticleBanner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const debounceRef = useRef<NodeJS.Timeout | null>(null);

    const { data: categories = [] } = useCategory({
        limit: 1000
    });

    const [search, setSearch] = useState(() => searchParams.get("search") || "");
    const [category, setCategory] = useState(() => searchParams.get("category") || "");

    const updateUrlParams = useCallback((searchValue: string, categoryValue?: string) => {
        const params = new URLSearchParams(searchParams.toString());
        
        if (searchValue) {
            params.set("search", searchValue);
        } else {
            params.delete("search");
        }

        if (categoryValue !== undefined) {
            if (categoryValue) {
                params.set("category", categoryValue);
            } else {
                params.delete("category");
            }
        }

        router.push(`/articles?${params.toString()}`, { scroll: false });
    }, [searchParams, router]);

    useEffect(() => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            if (search !== searchParams.get("search")) {
                updateUrlParams(search, undefined);
            }
        }, 500);

        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [search, searchParams, updateUrlParams]);
    
    const handleCategoryChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = e.target.value;
        setCategory(newCategory);
        updateUrlParams(search, newCategory);
    }, [search, updateUrlParams]);

    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, []);

    return (
        <section 
            className="relative w-full min-h-[500px] py-16 pt-6 px-4 text-white text-center flex flex-col justify-center items-center"
        >
            <Image
                src="/images/young-male-designer-using-graphics-tablet-while-working-with-com.jpg"
                alt="Designer working on a graphics tablet"
                fill
                priority
                className="object-cover -z-10"
                quality={80}
            />

            {/* Navbar tetap di atas */}
            <Navbar variant="transparent" className="absolute top-0 left-0 right-0 z-10 hidden md:block" />

            {/* Overlay */}
            <div className="absolute inset-0 bg-blue-600/70 -z-10" />

            {/* Konten tetap di depan */}
            <div className="relative z-0 max-w-4xl mx-auto pt-20">
                <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-sm font-medium">
                        Blog genzet
                    </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                    The Journal: Design Resources,<br />
                    Interviews, and Industry News
                </h1>
                <p className="text-xl md:text-2xl mb-12 font-light">
                    Your daily dose of design insights!
                </p>

                <div className="mt-8 max-w-2xl mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                        <div className="relative flex-shrink-0 sm:w-48">
                            <select
                                className="w-full h-12 rounded-md px-4 text-gray-700 bg-white border-0 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={category}
                                onChange={handleCategoryChange}
                            >
                                <option value="">All Categories</option>
                                {categories.map((cat) => (
                                    <option key={cat.id} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        <div className="relative flex-1">
                            <input
                                type="search"
                                placeholder="Search articles"
                                value={search}
                                onChange={handleSearchChange}
                                className="w-full h-12 rounded-md px-4 pr-10 text-gray-700 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                <Search className="w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}