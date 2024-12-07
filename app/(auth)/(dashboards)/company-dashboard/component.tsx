 'use client';

import { useSession } from '@/lib/auth-client';
import { User } from 'better-auth';

interface UserProfileProps {
//   initialSession?: {
//     user: {
//         id: string;
//         name: string;
//         username: string | null;
//         email: string;
//         emailVerified: boolean;
//         image: string | null;
//         createdAt: Date;
//         updatedAt: Date;
//     };
//     // session: {
//     //     id: string;
//     //     expiresAt: Date;
//     //     token: string;
//     //     createdAt: Date;
//     //     updatedAt: Date;
//     //     ipAddress: string;
//     //     userAgent: string;
//     //     userId: string;
//     //     user: User;
//     // };
//   };
use: {
    id: string;
    email: string;
    emailVerified: boolean;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    image?: string | null | undefined;
    username?: string | null | undefined;
}
}

export function UserProfile({ use }: UserProfileProps) {
  const { data, isPending, error } = useSession();

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading session</div>;
  }

  if (!data) {
    return <div>No active session</div>;
  }

  const { user, session } = data;

  return (
    <div>
      <h2>User Profile</h2>
      <div>
        {user.image && (
          <img 
            src={user.image} 
            alt={user.name || 'Profile'} 
            style={{ width: 100, height: 100, borderRadius: '50%' }}
          />
        )}
        <h3>{user.name || 'Anonymous User'}</h3>
        <p>Email: {user.email}</p>
        <p>Session ID: {session.id}</p>
        <p>Expires: {new Date(session.expiresAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}