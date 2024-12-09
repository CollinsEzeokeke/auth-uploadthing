import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    // Get the specific auth cookies we can see in the screenshot
    const sessionData = request.cookies.get('better-auth.session_data')
    const sessionToken = request.cookies.get('better-auth.session_token')

    // Check if both required cookies exist
    if (!sessionData || !sessionToken) {
        const returnUrl = encodeURIComponent(request.nextUrl.pathname)
        const message = encodeURIComponent("Please sign in to access the dashboard")
        return NextResponse.redirect(
            new URL(`/sign-in?returnUrl=${returnUrl}&message=${message}`, request.url)
        )
    }

    // If cookies exist, allow the request
    return NextResponse.next()
}

export const config = {
    matcher: ['/dashboard/:path*']
}