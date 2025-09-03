
"use client"

import { logoutAction } from "@/actions/auth/auth.actions"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { LogOut } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { redirect } from "next/navigation"
import { toast } from "sonner"
import { ModeToggle } from "@/components/ui/mode-toggle"
import { ThemeSelector } from "./theme-selector"

export function SiteHeader({ title = `Admininistration` }: { title?: string }) {


  const performLogout = () => {
    // Logic for logging out the user
    logoutAction()
    toast.success("Vous êtes déconnecté.")
    redirect("/")
  }

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <img
          src="/nobg1.png"
          alt="Description"
          className="w-13 h-15 object-contain"
        />
        <span className="text-lg font-semibold">{title}</span>
        <div className="ml-auto flex items-center gap-2">
          {/* Theme selector */}
          <ThemeSelector />
          {/* Mode toggle */}
          <ModeToggle />
          {/* Déconnexion */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="hidden sm:flex">
                <span className="flex items-center gap-2 dark:text-foreground">
                  <LogOut className="w-4 h-4" />
                  Deconnexion
                </span>
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Se déconnecter ?</DialogTitle>
                <DialogDescription>
                  Êtes-vous sûr de vouloir vous déconnecter ? Vous devrez
                  ressaisir vos identifiants pour revenir.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="flex justify-end gap-2">
                <Button variant="outline">Annuler</Button>
                <Button variant="default" onClick={performLogout}>
                  Confirmer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
    </header>
  )
}
