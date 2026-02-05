import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json([
        { id: 1, title: "Hello World"},
        { id: 2, title: "js is cool"},
    ]);
}