"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldAlert } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-6">
      <Card className="max-w-md w-full text-center shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <ShieldAlert className="h-12 w-12 text-red-500" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Accès refusé
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Vous n’avez pas les droits nécessaires pour accéder à cette page.
          </p>

          <Button onClick={() => router.back()} className="w-full">
            Retour
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
