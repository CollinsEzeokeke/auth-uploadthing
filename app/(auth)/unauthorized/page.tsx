"use client"

import { Suspense } from "react"
import Page from "@/components/unauthorisedParams"

export default function Unauthorized() {
    return(
        <Suspense fallback={<div>Loading....</div>}>
            <Page/>
        </Suspense>
    )
}