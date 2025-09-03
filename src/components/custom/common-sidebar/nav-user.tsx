"use client"

import {
  IconCreditCard,
  IconDotsVertical,
  IconLogout,
  IconNotification,
  IconUserCircle,
} from "@tabler/icons-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import { UserAuthModel } from "@/types/auth.types"
import { logoutAction } from "@/actions/auth/auth.actions"
import { toast } from "sonner"
import { redirect } from "next/navigation"
import { ClosedCaption, LogOut } from "lucide-react"

export function NavUser({
  userCookie,
}: {
  userCookie: UserAuthModel | null
}) {

  const performLogout = () => {
      // Logic for logging out the user
      logoutAction()
      toast.success("Vous êtes déconnecté.")
      redirect("/")
    }

  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={"/nobg1.png"} alt={userCookie?.nom} />
                <AvatarFallback className="rounded-lg">CF</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{userCookie?.nom} {userCookie?.prenom}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {userCookie?.phone} (<span className="font-medium">{userCookie?.role}</span>)
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={"/nobg1.png"} alt={userCookie?.nom} />
                  <AvatarFallback className="rounded-lg">CF</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{userCookie?.nom} {userCookie?.prenom}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {userCookie?.phone} (<span className="font-medium">{userCookie?.role}</span>)
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <IconUserCircle />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconCreditCard />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem>
                <IconNotification />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="default">
                  <span className="flex items-center gap-2 dark:text-foreground">
                    <LogOut className="w-4 h-4" />
                    Deconnexion
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Confirmez-vous la déconnexion ?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Vous serez alors redirigé vers la page de connexion et devrez ressaisir vos identifiants pour revenir.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    <span className="flex items-center gap-2">
                      <ClosedCaption className="w-4 h-4" />
                      Annuler
                    </span>
                  </AlertDialogCancel>
                  <AlertDialogAction onClick={performLogout}>
                    <span className="flex items-center gap-2">
                      <LogOut className="w-4 h-4" />
                      Confirmer
                    </span>
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
