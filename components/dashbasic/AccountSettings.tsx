'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

interface AccountSettingsProps {
  user: string | undefined
}

export function AccountSettings({ user }: AccountSettingsProps) {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  console.log(user)

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement password change logic here
    console.log('Password change requested')
  }

  const handleDeleteAccount = () => {
    // Implement account deletion logic here
    console.log('Account deletion requested')
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="space-y-8"
    >
      <h2 className="text-2xl font-semibold">Account Settings</h2>
      <form onSubmit={handleChangePassword} className="space-y-4">
        <h3 className="text-xl font-semibold">Change Password</h3>
        <div>
          <Label htmlFor="current-password">Current Password</Label>
          <Input
            id="current-password"
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="new-password">New Password</Label>
          <Input
            id="new-password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="confirm-password">Confirm New Password</Label>
          <Input
            id="confirm-password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <Button type="submit">Change Password</Button>
      </form>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Delete Account</h3>
        <p className="text-gray-500">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDeleteAccount}>
                <AlertTriangle className="mr-2 h-4 w-4" />
                Yes, delete my account
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </motion.div>
  )
}



// 'use client';

// import { useSession } from '@/lib/auth-client';

// interface UserProfileProps {
//   initialSession?: {
//     user: {
//       name?: string;
//       email: string;
//       image?: string;
//     };
//     // session: {
//     //   id: string;
//     //   expiresAt: string;
//     // };
//   };
// }

// export default function AccountSettings({ initialSession }: UserProfileProps) {
//   const { data, isPending, error } = useSession();

//   if (isPending) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error loading session</div>;
//   }

//   if (!data) {
//     return <div>No active session</div>;
//   }

//   const { user, session } = data;

//   return (
//     <div>
//       <h2>User Profile</h2>
//       <div>
//         {user.image && (
//           <img 
//             src={user.image} 
//             alt={user.name || 'Profile'} 
//             style={{ width: 100, height: 100, borderRadius: '50%' }}
//           />
//         )}
//         <h3>{user.name || 'Anonymous User'}</h3>
//         <p>Email: {user.email}</p>
//         <p>Session ID: {session.id}</p>
//         <p>Expires: {new Date(session.expiresAt).toLocaleDateString()}</p>
//       </div>
//     </div>
//   );
// }

