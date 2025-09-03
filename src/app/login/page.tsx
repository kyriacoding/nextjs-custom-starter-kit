
"use client";

import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { loginUserAction } from "@/actions/auth/auth.actions";
import { useState } from "react";
import { redirect } from "next/navigation";
import { UserAuthModel } from "@/types/auth.types";

type LoginFormInputs = {
  phone: string;
  password: string;
};

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}

function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    const res = await loginUserAction(data.phone, data.password);

    if (res.success) {

      const loadedUser: UserAuthModel = res.data as UserAuthModel;

      if(loadedUser.role === "superadmin" || loadedUser.role === "admin") {
        console.log("✅ Connecté :", res.data);
        toast.success("Connexion réussie !");
        redirect("/admin");
      } else if(loadedUser.role === "intendance") {
        redirect("/intendance");
      } else {
        toast.error("❌ " + res.error || res.message);
      }
    } else {
      toast.error("❌ " + res.error || res.message);
    }
  };


  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          {/* Formulaire */}
          <form
            className="p-6 md:p-8 flex flex-col gap-6"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Bienvenue</h1>
              <p className="text-muted-foreground text-balance">
                Connectez-vous à votre compte ChurchFlow
              </p>
            </div>

            {/* Phone */}
            <div className="grid gap-3">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="6xxxxxxxx"
                {...register("phone", {
                  required: "Le téléphone est requis",
                  minLength: {
                    value: 9,
                    message: "Le numéro doit contenir 9 chiffres",
                  },
                  maxLength: {
                    value: 9,
                    message: "Le numéro doit contenir 9 chiffres",
                  },
                })}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Password */}
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Mot de passe</Label>
                <a
                  href="#"
                  className="ml-auto text-sm underline-offset-2 hover:underline"
                >
                  Mot de passe oublié ?
                </a>
              </div>
              <InputPassword
                id="password"
                placeholder="Votre mot de passe"
                {...register("password", {
                  required: "Le mot de passe est requis",
                  minLength: { value: 6, message: "Minimum 6 caractères" },
                })}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Connexion..." : "Connexion"}
            </Button>
          </form>

          {/* Image */}
          <div className="bg-muted relative hidden md:block">
            <div className="flex items-center justify-center h-full w-full">
              <img
                src="/nobg1.png"
                alt="Description"
                className="w-48 h-48 object-contain"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}

interface InputPasswordProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

function InputPassword({ ...props }: InputPasswordProps) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <Input
        type={show ? "text" : "password"}
        {...props}
        className="pr-10" // espace pour l’icône
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
        onClick={() => setShow((prev) => !prev)}
      >
        {show ? (
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Eye className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>
    </div>
  );
}
