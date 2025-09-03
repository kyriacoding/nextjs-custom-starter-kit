import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";
import { UserAuthModel } from "@/types/auth.types";

// Les routes protégées avec les rôles autorisés
const roleAccess: Record<string, string[]> = {
  "/admin": ["superadmin", "admin"], // admin accessible seulement par superadmin
  "/intendance": ["superadmin", "admin", "intendance"], // intendance accessible par superadmin + intendance
};

export async function middleware(req: NextRequest) {

    const pathname = req.nextUrl.pathname;

    const cookieStore = await cookies();
  const userCookie = cookieStore.get("userCookie")?.value;

  // 🚦 1. Cas des routes publiques ("/" et "/login")
  if (pathname === "/" || pathname.startsWith("/login")) {
    if (userCookie) {
      try {
        const user = JSON.parse(userCookie);

        // Rediriger selon le rôle
        if (user.role === "superadmin" || user.role === "admin") {
          return NextResponse.redirect(new URL("/admin", req.url));
        } else if (user.role === "intendance") {
          return NextResponse.redirect(new URL("/intendance", req.url));
        } 
      } catch (e) {
        console.error("Cookie user invalide", e);
      }
    }
    // Pas connecté → accès autorisé à "/" ou "/login"
    return NextResponse.next();
  }

  // 🚦 2. Cas des routes protégées
  if (!userCookie) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  let user: UserAuthModel | null = null;

  try {

    user = JSON.parse(userCookie);

    if(user === null) {
        console.error("userCookie nulle", user);
        cookieStore.delete('userCookie');
        return NextResponse.redirect(new URL("/login", req.url));
    }

    // Vérifie si la route est protégée
    for (const [path, allowedRoles] of Object.entries(roleAccess)) {
      if (pathname.startsWith(path)) {
        if (!allowedRoles.includes(user.role)) {
          // Non autorisé → redirection vers une page Unauthorized
          return NextResponse.redirect(new URL("/unauthorized", req.url));
        }
      }
    }

    // 🚦 3. Sinon → route autorisée
    return NextResponse.next();
  } catch (err) {
    console.error("userCookie invalide", err);
    cookieStore.delete('userCookie');
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Indique les chemins à matcher
export const config = {
  matcher: [
    "/",                // page publique
    "/login/:path*",    // page login
    "/admin/:path*",    // routes boss
    "/intendance/:path*", // routes intendance
  ],
};
