
export const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null; // sécurité côté serveur

  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? decodeURIComponent(match[2]) : null;
}
