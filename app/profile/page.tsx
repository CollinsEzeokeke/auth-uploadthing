// app/profile/page.tsx
import { UpdateUserForm } from '@/components/updateUserComponent'
import { UseGetUser } from '@/hooks/gettingUser'

export default function ProfilePage() {
  const {data: userData, isPending, error} = UseGetUser()
  if(isPending){
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>;
}
if (!userData) {
    return <div>No user data available</div>;
}
  return (
    <div>
      <h1>Update Profile</h1>
      <UpdateUserForm user={userData} />
    </div>
  )
}