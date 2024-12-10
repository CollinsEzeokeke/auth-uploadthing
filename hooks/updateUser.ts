// hooks/useUpdateUser.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { User } from '@prisma/client'

interface UpdateUserData {
    userId: string
    data: Partial<User>
}

export function useUpdateUser() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ userId, data }: UpdateUserData) => {
            const response = await fetch(`/api/users/${userId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`)
            }

            return response.json()
        },
        onSuccess: (data) => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['user', data.id] })
            queryClient.invalidateQueries({ queryKey: ['users'] })
        },
    })
}