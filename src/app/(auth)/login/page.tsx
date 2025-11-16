import Link from "next/link";
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

export default function LoginPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Logg inn</CardTitle>
        <CardDescription>
          Skriv inn e-posten din under for å logge på kontoen din.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">E-post</Label>
          <Input id="email" type="email" placeholder="navn@eksempel.com" required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Passord</Label>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full">
            <Link href="/dashboard">Logg inn</Link>
        </Button>
        <Button variant="outline" className="w-full">
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
