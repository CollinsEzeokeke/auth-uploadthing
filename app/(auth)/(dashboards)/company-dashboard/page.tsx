import { headers } from 'next/headers';
import { authClient } from '@/lib/auth-client';
import { UserProfile } from './component';

export default async function ProfilePage() {
  const session = await authClient.getSession()

  return <UserProfile use={session.data?.user} />;
}

