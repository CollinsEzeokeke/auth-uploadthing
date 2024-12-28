import React from 'react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { UserRole } from './UserProfile';
import { useRouter, usePathname } from 'next/navigation';

interface MenuItem {
  title: string;
  icon: React.ElementType;
  path: string;
}

interface NavigationMenuProps {
  menuItems: MenuItem[];
  userRole: UserRole;
}

const NavigationMenu = ({ menuItems, userRole }: NavigationMenuProps) => {
  const router = useRouter();
  const pathname = usePathname()

  return (
    <div className="hidden md:block">
      <SidebarGroup>
        <SidebarGroupLabel>Menu</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  className={cn(
                    'w-full',
                    pathname === item.path ? 'bg-primary/10 text-primary' : ''
                  )}
                  onClick={() => router.push(item.path)}
                >
                  <item.icon className="w-4 h-4 mr-2" />
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </div>
  );
};

export default NavigationMenu;