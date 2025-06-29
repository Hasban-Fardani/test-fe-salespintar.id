import { type NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/dashboard", "/profile", "/settings"];
export default function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value;

    const isNextProtectedRoute = protectedRoutes.includes(request.nextUrl.pathname)
    if (!token && isNextProtectedRoute) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}
