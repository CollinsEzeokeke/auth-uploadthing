'use server'

import prisma from '@/prisma/prisma'
import { revalidatePath } from 'next/cache'
import { UserRole } from '@prisma/client'

interface User{
    name: string | undefined
    email: string | undefined
    image: string | undefined 
    UserType: UserRole | undefined   
    username: string |  undefined
    Bio: string | undefined    
}

export default async function getUsers(email: string) {
    const user = await prisma.user.findUnique({
        where: { email }
    })
    return user
}

export async function updateUser(userId: string, data: Partial<User>) {
    const updated = await prisma.user.update({
        where: { id: userId },
        data
    })
    revalidatePath('/profile')
    return updated
}