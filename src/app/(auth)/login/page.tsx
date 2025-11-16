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
import { handleSignIn, handleGoogleSignIn } from "@/lib/firebase/auth";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleSignIn(email, password);
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        title: "Innlogging feilet",
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
        <CardTitle className="text-2xl">Logg inn</CardTitle>
        <CardDescription>
          Skriv inn e-posten din under for å logge på kontoen din.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <form onSubmit={onLogin} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">E-post</Label>
            <Input id="email" type="email" placeholder="navn@eksempel.com" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Passord</Label>
            <Input id="password" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>
          <Button type="submit" className="w-full">
            Logg inn
          </Button>
        </form>
        <Button variant="outline" className="w-full" onClick={onGoogleLogin}>
          Logg inn med Google
        </Button>
      </CardContent>
      <div className="mt-4 text-center text-sm p-6 pt-0">
        Har du ikke en konto?{" "}
        <Link href="/register" className="underline">
          Registrer deg
        </Link>
      </div>
    </Card>
  );
}
