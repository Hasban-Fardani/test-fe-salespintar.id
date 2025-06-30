"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";
import Navbar from "@/components/navigation/Navbar";
import { useCategory } from "@/hooks/useCategories";

export default function ArticleBanner() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const debounceRef = useRef<NodeJS.Timeout>({} as NodeJS.Timeout);

    const { data: categories } = useCategory({
        limit: 1000
    })

    // Memoize initial values to prevent unnecessary re-renders
    const initialSearch = useMemo(() => searchParams.get("search") || "", [searchParams]);
    const initialCategory = useMemo(() => searchParams.get("category") || "", [searchParams]);

    const [search, setSearch] = useState(initialSearch);
    const [category, setCategory] = useState(initialCategory);

    // Memoized function to update URL params
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

        router.push(`/articles?${params.toString()}`);
    }, [searchParams, router]);

    // Debounced search effect
    useEffect(() => {
        // Clear existing timeout
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }

        debounceRef.current = setTimeout(() => {
            updateUrlParams(search);
        }, 300);

        // Cleanup function
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current);
            }
        };
    }, [search, updateUrlParams]);

    // Memoized category change handler
    const handleCategoryChange = useCallback((value: string) => {
        setCategory(value);
        updateUrlParams(search, value);
    }, [search, updateUrlParams]);

    // Memoized search change handler
    const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }, []);

    // Memoized category select change handler
    const handleSelectChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        handleCategoryChange(e.target.value);
    }, [handleCategoryChange]);

    // Memoized category options
    const categoryOptions = useMemo(() => (
        categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
                {cat.name}
            </option>
        )).push(<option key="all" value="">All</option>)
    ), [categories]);

    // Memoized static elements
    const navbarElement = useMemo(() => (
        <Navbar variant="transparent" className="absolute z-10 hidden md:block" />
    ), []);

    const overlayElement = useMemo(() => (
        <div className="absolute inset-0 bg-blue-600/70" />
    ), []);

    const brandLabelElement = useMemo(() => (
        <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-medium">
                Blog genzet
            </span>
        </div>
    ), []);

    const titleElement = useMemo(() => (
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            The Journal : Design Resources,<br />
            Interviews, and Industry News
        </h1>
    ), []);

    const subtitleElement = useMemo(() => (
        <p className="text-xl md:text-2xl mb-12 font-light">
            Your daily dose of design insights!
        </p>
    ), []);

    const dropdownArrowElement = useMemo(() => (
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <ChevronDown className="w-5 h-5 text-gray-400" />
        </div>
    ), []);

    const searchIconElement = useMemo(() => (
        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
        </div>
    ), []);

    return (
        <section 
            className="relative w-full min-h-[500px] py-16 pt-6 px-4 text-white text-center bg-cover bg-center"
            style={{
                backgroundImage: "url('/images/young-male-designer-using-graphics-tablet-while-working-with-com.jpg')"
            }}
        >
            {navbarElement}
            {overlayElement}

            <div className="relative z-10 max-w-4xl mx-auto pt-20">
                {brandLabelElement}
                {titleElement}
                {subtitleElement}

                <div className="mt-8 max-w-2xl mx-auto">
                    <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                        <div className="relative flex-shrink-0 sm:w-48">
                            <select
                                className="w-full h-12 rounded-md px-4 text-gray-700 bg-white border-0 appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={category}
                                onChange={handleSelectChange}
                            >
                                <option value="">Select category</option>
                                {categoryOptions}
                            </select>
                            {dropdownArrowElement}
                        </div>

                        <div className="relative flex-1">
                            <input
                                type="search"
                                placeholder="Search articles"
                                value={search}
                                onChange={handleSearchChange}
                                className="w-full h-12 rounded-md px-4 pr-10 text-gray-700 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {searchIconElement}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}