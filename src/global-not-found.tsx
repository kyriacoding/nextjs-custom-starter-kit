"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SearchX } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GlobalNotFound() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-6">
      <Card className="max-w-md w-full text-center shadow-lg">
        <CardHeader>
          <div className="flex justify-center mb-2">
            <SearchX className="h-12 w-12 text-gray-500" />
          </div>
          <CardTitle className="text-2xl font-bold">
            Page introuvable
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Oups 😢 La page que vous cherchez n’existe pas ou a été déplacée.
          </p>

          <Button onClick={() => router.push("/")} className="w-full">
            Retour à l’accueil
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
