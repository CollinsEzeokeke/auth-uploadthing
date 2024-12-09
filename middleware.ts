import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
    // Get the specific auth cookies we can see in the screenshot
    const sessionData = request.cookies.get('better-auth.session_data')
    const sessionToken = request.cookies.get('better-auth.session_token')
    const orSessionData = request.cookies.get('__Secure-better-auth.session_data')
    const orSessionToken = request.cookies.get('__Secure-better-auth.session_token')

    if (sessionData || sessionToken || orSessionData || orSessionToken) {
        return NextResponse.next()
    }

        const returnUrl = encodeURIComponent(request.nextUrl.pathname)
        const message = encodeURIComponent("Please sign in to access the dashboard")
        return NextResponse.redirect(
            new URL(`/sign-in?returnUrl=${returnUrl}&message=${message}`, request.url)
        )
}

export const config = {
    matcher: ['/dashboard/:path*']
}