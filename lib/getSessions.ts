// // pages/api/getUser.js
// import { authClient } from '@/lib/auth-client'
// import prisma from '@/prisma/prisma'
// import { NextResponse } from 'next/server'

// export default async function handler() {
//   try {
//     const session = await authClient.getSession()
//     if (session?.data?.user?.emailVerified) {
//       const user = await prisma.user.findUnique({
//         where: {
//         //   email: session.data?.user.email,
//           id: session.data?.user.id
//         }
//       })
//       NextResponse.json(
//         user,{status: 200}
//       )
//     } else {
//         NextResponse.json(

//             {error: "UNAUTHORIZED"},
//             {status: 401}
//         )
//     }

//   } catch (error) {
//     console.error(error)
//     NextResponse.json(
//         {error: 'Internal Server Error'},
//         {status: 500}
//     )
//   }
// }


import { authClient } from "./auth-client";

export default async function getUser() {
    try {
        const { data: session, error } = await authClient.getSession();
        
        if (error) {
            console.log("Error fetching session:", error.message);
            return null;
        }
        
        if (!session) {
            console.log("UNAUTHORIZED");
            return null;
        }
        console.log(session.user.email)
        
        return session;
    } catch (error) {
        console.log("Unexpected error:", error);
        return null;
    }
}