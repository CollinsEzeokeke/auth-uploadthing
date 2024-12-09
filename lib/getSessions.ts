import { redirect } from "next/navigation";
import { authClient } from "./auth-client";

export default async function UserSessions() {
    try {
        const { data: session, error } = await authClient.getSession();
        
        if (error) {
            console.log("Error fetching session:", error.message);
            return null;
        }
        if (!session) {
            console.log("UNAUTHORIZED");
            const message = 'Access denied sign-in or create an account to continue'
            redirect(`/unauthorized?message=${encodeURIComponent(message)}`)
            return null;
        }
        if(session){
        console.log(session.user.email)
            return session;
        }
    } catch (error) {
        console.log("Unexpected error:", error);
        return null;
    }
}