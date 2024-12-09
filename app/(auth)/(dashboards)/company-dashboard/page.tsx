'use client'

// import { authClient } from '@/lib/auth-client'
import getUser from '@/app/actions/user'
import { useQuery } from '@tanstack/react-query'
import UserSessions from '@/lib/getSessions'

const ClientComponent = () => {
  const {data: userData, isPending, error} = useQuery({
    queryKey: ['Data'],
    queryFn: async () => {
        const result = await UserSessions();
        if(result){
          await getUser(result?.user.email)
        }
        return JSON.parse(JSON.stringify(result?.user))
    }
  })
if(isPending){
    return <div>Loading....</div>
}
if (error){
    console.log(error)
}
  return(
    <div>
    <h1>THIS IS THE USER {userData.name}</h1>
    </div>
  )
}

export default ClientComponent