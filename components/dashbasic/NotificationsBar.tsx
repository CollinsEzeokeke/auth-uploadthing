import React from 'react';
import { Bell, Star } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: number;
  message: string;
  isNew: boolean;
}

interface NotificationsBarProps {
  notifications: Notification[];
}

const NotificationsBar = ({ notifications }: NotificationsBarProps) => {
  return (
    <div className="p-2 border-b flex justify-around">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            {notifications.some(n => n.isNew) && (
              <Badge 
                className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-destructive text-destructive-foreground"
                variant="destructive"
              >
                {notifications.filter(n => n.isNew).length}
              </Badge>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-72">
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className="p-3">
              <div>
                <p className="text-sm">{notification.message}</p>
                {notification.isNew && (
                  <Badge variant="secondary" className="mt-1">New</Badge>
                )}
              </div>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="ghost" size="icon">
        <Star className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default NotificationsBar;