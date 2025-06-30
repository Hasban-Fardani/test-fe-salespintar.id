import { NextRequest, NextResponse } from "next/server";
import apiClient from "@/lib/api";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
    try {
        const pageParams = await params;
        const { data } = await apiClient.get(`/articles/${pageParams.id}`);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching article:', error);

        return NextResponse.json(
            { error: 'Failed to fetch article' },
            { status: 500 }
        );
    }
}

export async function PUT(request: NextRequest, { params }: RouteContext) {
    try {
        const pageParams = await params;
        const body = await request.json();
        const { data } = await apiClient.put(`/articles/${pageParams.id}`, body);
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error updating article:', error);

        return NextResponse.json(
            { error: 'Failed to update article' },
            { status: 500 }
        );
    }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
    try {
        const pageParams = await params;

        await apiClient.delete(`/articles/${pageParams.id}`);
        return NextResponse.json({ message: 'Article deleted successfully' });
    } catch (error) {
        console.error('Error deleting article:', error);

        return NextResponse.json(
            { error: 'Failed to delete article' },
            { status: 500 }
        );
    }
}