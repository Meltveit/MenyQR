import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockMenus, mockUser } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function PublicMenuPage({ params }: { params: { menuId: string } }) {
  const menu = mockMenus.find((m) => m.id === params.menuId);

  if (!menu) {
    notFound();
  }
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('');
  }

  return (
    <div className="min-h-screen bg-muted/30 font-sans">
      <div className="max-w-xl mx-auto">
        <header className="py-8 px-4 text-center space-y-4">
            <Avatar className="h-24 w-24 mx-auto border-4 border-background shadow-md">
                <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
                <AvatarFallback>{getInitials(mockUser.name)}</AvatarFallback>
            </Avatar>
            <h1 className="text-4xl font-bold">{mockUser.name}</h1>
            <p className="text-lg text-muted-foreground">{menu.name}</p>
        </header>

        <main className="px-2 pb-8">
          <Tabs defaultValue={menu.categories[0].id} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              {menu.categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {menu.categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="space-y-4">
                  {category.items.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      <div className="flex items-start space-x-4 p-4">
                         {item.imageUrl && (
                            <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-md overflow-hidden shrink-0">
                                <Image
                                    src={item.imageUrl}
                                    alt={item.name}
                                    fill
                                    className="object-cover"
                                    data-ai-hint="food item"
                                />
                            </div>
                        )}
                        <div className="flex-grow">
                          <CardHeader className="p-0">
                            <CardTitle className="text-lg flex justify-between">
                              <span>{item.name}</span>
                              <span className="text-primary">{item.price} kr</span>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="p-0 mt-2">
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                            {item.allergens.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {item.allergens.map(allergen => (
                                        <Badge key={allergen} variant="secondary">{allergen}</Badge>
                                    ))}
                                </div>
                            )}
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </main>
        <footer className="text-center py-4 text-muted-foreground text-sm">
            <p>Powered by MenyQR</p>
        </footer>
      </div>
    </div>
  );
}
