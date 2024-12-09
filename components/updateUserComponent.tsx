// components/UpdateUserForm.tsx
'use client'

import { useState } from 'react'
import { useUpdateUser } from '@/hooks/updateUser'
import { User } from '@prisma/client'

interface UpdateUserFormProps {
    user: User
}

export function UpdateUserForm({ user }: UpdateUserFormProps) {
    const [name, setName] = useState(user.name)
    const [email, setEmail] = useState(user.email)

    const updateUser = useUpdateUser()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        updateUser.mutate({
            userId: user.id,
            data: {
                name,
                email,
            }
        }, {
            onSuccess: () => {
                // Handle success (e.g., show toast notification)
                console.log('User updated successfully')
            },
            onError: (error) => {
                // Handle error
                console.error('Failed to update user:', error)
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name:</label>
                <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <button
                type="submit"
                disabled={updateUser.isPending}
            >
                {updateUser.isPending ? 'Updating...' : 'Update User'}
            </button>
        </form>
    )
}