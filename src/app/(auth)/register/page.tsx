"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { handleSignUp, handleGoogleSignIn } from "@/lib/firebase/auth";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [restaurantName, setRestaurantName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSignUp(email, password, restaurantName);
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Registrering feilet",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const onGoogleLogin = async () => {
    try {
      await handleGoogleSignIn();
      router.push("/dashboard");
    } catch (error: any) {
       toast({
        title: "Google innlogging feilet",
        description: error.message,
        variant: "destructive",
      });
    }
  };


  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Registrer deg</CardTitle>
        <CardDescription>
          Opprett din konto for å starte med MenyQR.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onRegister} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="restaurant-name">Restaurantnavn</Label>
            <Input id="restaurant-name" placeholder="Din Restaurant" required value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">E-post</Label>
            <Input
              id="email"
              type="email"
              placeholder="navn@eksempel.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Passord</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full">
            Opprett konto
          </Button>
        </form>
        <Button variant="outline" className="w-full mt-4" onClick={onGoogleLogin}>
          Registrer med Google
        </Button>
        <div className="mt-4 text-center text-sm">
          Har du allerede en konto?{" "}
          <Link href="/login" className="underline">
            Logg inn
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
