import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Check } from 'lucide-react';

export type UserStatus = 'basic' | 'verified' | 'premium';
export type UserRole = 'basic' | 'company' | 'admin';

interface UserProfileProps {
  userStatus: UserStatus;
  userRole: UserRole;
  userAvatar: string;
}

const UserProfile = ({ userStatus, userRole, userAvatar }: UserProfileProps) => {
  const getVerificationBadge = (status: UserStatus) => {
    if (status === 'verified') {
      return <Check className="w-4 h-4 text-success" />;
    }
    if (status === 'premium') {
      return <Check className="w-4 h-4 text-primary" />;
    }
    return null;
  };

  return (
    <div className="px-4 py-2 border-b">
      <div className="flex items-center space-x-3">
        <div className="relative">
          <Avatar>
            <AvatarImage src={userAvatar} alt="User avatar" />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          {getVerificationBadge(userStatus) && (
            <div className="absolute -bottom-1 -right-1 rounded-full bg-white p-0.5">
              {getVerificationBadge(userStatus)}
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">User Name</p>
          <p className="text-xs text-muted-foreground truncate">{userRole} Account</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;