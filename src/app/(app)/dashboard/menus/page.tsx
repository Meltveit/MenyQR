import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, PlusCircle, Edit, Eye, Trash2 } from "lucide-react";
import { mockMenus } from "@/lib/data";

export default function MenusPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dine Menyer</h1>
        <Button asChild>
          <Link href="#">
            <PlusCircle className="mr-2 h-4 w-4" />
            Opprett Ny Meny
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockMenus.map((menu) => (
          <Card key={menu.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle>{menu.name}</CardTitle>
                  <CardDescription>Sist oppdatert: {menu.lastUpdated}</CardDescription>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Rediger
                    </DropdownMenuItem>
                    <Link href={`/m/${menu.id}`} target="_blank">
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        Vis
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Slett
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{menu.description}</p>
            </CardContent>
            <CardFooter>
                <Button variant="secondary" className="w-full" asChild>
                    <Link href={`/m/${menu.id}`} target="_blank">Vis Offentlig Meny</Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
