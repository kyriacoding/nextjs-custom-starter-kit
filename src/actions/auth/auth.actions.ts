
"use server"

import axios from "axios";

import { 
    UserAuthModel,
    UserAuthResponse,
} from "@/types/auth.types";
import { cookies } from "next/headers";

// server action pour faire le login en prenant phone et motdepasse
/**
 * 
 * Fonction pour connecter un utilisateur
 * 
 * @param phone Le numéro de téléphone de l'utilisateur
 * 
 * @param motdepasse Le mot de passe de l'utilisateur
 * 
 * @returns Une promesse contenant la réponse de l'API
 * 
 */
export async function loginUserAction(phone: string, motdepasse: string): Promise<UserAuthResponse> {

    const cookieStore = await cookies();

    cookieStore.delete('userCookie');

    try {
    const response = await axios.post<UserAuthResponse>(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/auth/login-mobile`,
      { 
        phone: phone, 
        password: motdepasse 
      },
      {
        headers: { 
            "Content-Type": "application/json",
            "x-superadmin-header": process.env.NEXT_PUBLIC_ADMIN_KEY
        },
        //withCredentials: true, // si ton API set un cookie
      }
    );

    if(response.status === 200) {
        
        const loadedUser: UserAuthModel = response.data.data as UserAuthModel;

        if(loadedUser.role === "superadmin" || loadedUser.role === "admin" || loadedUser.role === "intendance") {
            // Stocke le token JWT dans un cookie HttpOnly
            cookieStore.set("userCookie", JSON.stringify(loadedUser), {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                maxAge: 60 * 60 * 24 * 2, // 2 jours
                sameSite: "lax",
                path: "/",
            });
            return response.data;
        } else {
            cookieStore.delete('userCookie');
            return {
                success: false,
                total: 0,
                message: "Vous n'avez pas les autorisations nécessaires.",
                error: "Vous n'avez pas les autorisations nécessaires.",
                data: null,
            };
        }
      
    } else {
        cookieStore.delete('userCookie');
        return {
            success: false,
            total: 0,
            message: response.data.message || "Échec de connexion",
            error: response.data.error || "Erreur inconnue",
            data: null,
        };
    }

  } catch (error: any) {
    cookieStore.delete('userCookie');

    // Gestion propre des erreurs axios
    return {
      success: false,
      total: 0,
      message: "Échec de connexion",
      error: error.response?.data?.error || error.message,
      data: null,
    };
  }
}

/**
 * 
 * Action pour se déconnecter en supprimant le cookie
 * 
 */
export async function logoutAction(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('userCookie');
}

// récupérer le user depuis le cookie
export async function getUserFromCookie(): Promise<UserAuthModel | null> {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get("userCookie");

  if (userCookie) {
    return JSON.parse(userCookie.value) as UserAuthModel;
  }

  return null;
}
