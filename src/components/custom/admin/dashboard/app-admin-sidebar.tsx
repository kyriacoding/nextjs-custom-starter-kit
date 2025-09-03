"use client"

import * as React from "react"
import {
  IconUsers,
  IconDashboardFilled,
  IconUsersGroup,
  IconCalendarCheck,
  IconUserStar
} from "@tabler/icons-react"

import { NavMenus } from "@/components/custom/common-sidebar/nav-menus"
import { NavUser } from "@/components/custom/common-sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { UserAuthModel } from "@/types/auth.types"
import { getCookie } from "@/utils/common.utils"
import { toast } from "sonner"
import { ItemMenu } from "@/types/components.types"

const itemMenus: {
  users: ItemMenu[],
  fetes: ItemMenu[],
} = {
  users: [
    {
      name: "Tableau de bord",
      url: "/admin",
      icon: IconDashboardFilled,
    },
    {
      name: "Liste des utilisateurs",
      url: "/admin/users",
      icon: IconUsers,
    },
    {
      name: "Liste des rôles",
      url: "/admin/roles",
      icon: IconUsersGroup,
    },
    {
      name: "Liste des frères",
      url: "/admin/freres",
      icon: IconUserStar,
    },
  ],
  fetes: [
    {
      name: "Gérer les fêtes",
      url: "/admin/fetes",
      icon: IconCalendarCheck,
    },
    {
      name: "Liste des utilisateurs",
      url: "#",
      icon: IconUsers,
    },
    {
      name: "Liste des rôles",
      url: "#",
      icon: IconUsersGroup,
    },
  ],
}

export function AppAdminSidebar(
  { ...props }: React.ComponentProps<typeof Sidebar>,
) {

  const [userCookie, setUserCookie] = React.useState<UserAuthModel | null>(null);

  const fetchUser = () => {
    
    const cookie = getCookie("userCookie");
    if (cookie) {
      try {
        const parsed = JSON.parse(cookie) as UserAuthModel;
        setUserCookie(parsed);
        console.log("User from cookie:", parsed.nom);
        toast.success(`Bienvenue ${parsed.nom} ${parsed.prenom} !`);
      } catch (e: any) {
        console.error("Cookie user invalide", e);
        toast.error("Cookie user invalide: " + e.message);
      }
    } else {
      console.log("No user cookie found");
      toast.error("No user cookie found");
    }
  };

  React.useEffect(() => {
    fetchUser();
  }, []);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <img
                  src="/nobg1.png"
                  alt="Description"
                  className="w-10 h-10 object-contain"
                />
                <span className="text-base font-semibold">ChurchFlow</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMenus items={itemMenus.users} />
        <NavMenus items={itemMenus.fetes} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser userCookie={userCookie} />
      </SidebarFooter>
    </Sidebar>
  )
}
