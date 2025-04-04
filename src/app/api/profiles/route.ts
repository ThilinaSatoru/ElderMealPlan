// src/app/api/profiles/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const apiResponse = await fetch('http://127.0.0.1:5000/profile/');
        if (!apiResponse.ok) {
            throw new Error('Failed to fetch from external API');
        }
        const data = await apiResponse.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return NextResponse.json(
            { error: 'Failed to fetch profiles' },
            { status: 500 }
        );
    }
}