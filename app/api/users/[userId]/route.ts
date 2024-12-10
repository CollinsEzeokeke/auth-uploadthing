import prisma from "@/prisma/prisma";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { userId: string } }) {
    try {
        const body = await req.json()
        const userId = params.userId;

        const UpdateUser = await prisma.user.update({
            where: {
                id: userId,
            },
            data: body,
        })
        return NextResponse.json(UpdateUser)
    } catch (error) {
        console.log('this is the error', error)
        throw error
    }
}