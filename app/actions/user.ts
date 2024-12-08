'use server'

import prisma from '@/prisma/prisma'

export default async function getUsers(email: string) {
    const user = await prisma.user.findUnique({
        where: { email }
    })
    return user
}