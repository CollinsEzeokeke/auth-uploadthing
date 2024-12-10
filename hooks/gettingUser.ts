import { useQuery } from "@tanstack/react-query";
import UserSessions from "@/lib/getSessions";
import getUsers from "@/app/actions/user";

export function UseGetUser() {
    return useQuery({
        queryKey: ['GetUserHook'],
        queryFn: async () => {
            const result = await UserSessions()
            if (!result) {
                return null;
            }
            try {
                const UserInfo = await getUsers(result?.user.email)
                const SerializedUser = JSON.parse(JSON.stringify(UserInfo || {}));
                return SerializedUser;
            } catch (error) {
                console.log('Error fetching data:', error)
                throw error
            }
        }
    })
}