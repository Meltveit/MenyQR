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

export default function RegisterPage() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Registrer deg</CardTitle>
        <CardDescription>
          Opprett din konto for å starte med MenyQR.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="restaurant-name">Restaurantnavn</Label>
            <Input id="restaurant-name" placeholder="Din Restaurant" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">E-post</Label>
            <Input
              id="email"
              type="email"
              placeholder="navn@eksempel.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Passord</Label>
            <Input id="password" type="password" />
          </div>
          <Button type="submit" className="w-full">
            <Link href="/dashboard">Opprett konto</Link>
          </Button>
          <Button variant="outline" className="w-full">
            Registrer med Google
          </Button>
        </div>
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
