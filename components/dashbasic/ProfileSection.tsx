'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Edit2, Save } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import UserTypeDialog from './UserTypeDialog'

interface ProfileSectionProps {
  user: {
    name: string
    email: string
    avatar: string
    userType: string
    username: string
    bio: string
  }
  setUser: React.Dispatch<React.SetStateAction<any>>
}

export function ProfileSection({ user, setUser }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)

  const handleSave = () => {
    setUser(editedUser)
    setIsEditing(false)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold">Your Profile</h2>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? <Save className="mr-2 h-4 w-4" /> : <Edit2 className="mr-2 h-4 w-4" />}
          {isEditing ? 'Save' : 'Edit'}
        </Button>
      </div>
      <div className="flex items-center space-x-8">
        <Avatar className="h-24 w-24">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-500">{user.email}</p>
          <div className="flex items-center mt-2">
            <span className="text-sm font-medium text-gray-500 mr-2">User Type:</span>
            <span className="text-sm font-semibold">{user.userType}</span>
            <UserTypeDialog />
          </div>
        </div>
      </div>
      {isEditing ? (
        <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={editedUser.username}
              onChange={(e) => setEditedUser({ ...editedUser, username: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={editedUser.bio}
              onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
              rows={4}
            />
          </div>
          <Button onClick={handleSave}>Save Changes</Button>
        </form>
      ) : (
        <div className="space-y-4">
          <div>
            <Label>Username</Label>
            <p>{user.username}</p>
          </div>
          <div>
            <Label>Bio</Label>
            <p>{user.bio}</p>
          </div>
        </div>
      )}
    </motion.div>
  )
}

