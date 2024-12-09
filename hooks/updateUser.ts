// hooks/useUpdateUser.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { User } from '@prisma/client'

interface UpdateUserData {
    userId: string
    data: Partial<User>
}

export function useUpdateUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ userId, data }: UpdateUserData) => {
            const response = await axios.patch(`/api/users/${userId}`, data)
            return response.data
        },
        onSuccess: (data) => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['user', data.id] })
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })
}