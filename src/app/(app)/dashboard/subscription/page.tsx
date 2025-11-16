import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Crown } from "lucide-react";
import { mockUser, pricingTiers } from "@/lib/data";

export default function SubscriptionPage() {
  const currentUserTier = pricingTiers.find(tier => tier.name === mockUser.tier);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Abonnement</h1>
      
      {currentUserTier && (
        <Card className="bg-primary/5 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="text-primary"/>
              Din Nåværende Plan: {currentUserTier.name}
            </CardTitle>
            <CardDescription>
              Takk for at du er en del av MenyQR!
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>Du har tilgang til alle funksjoner i <strong>{currentUserTier.name}</strong>-pakken.</p>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-4">Oppgrader din plan</h2>
        <p className="text-muted-foreground mb-8">Velg en plan som passer for din bedrift. Spar 20% med årlig betaling.</p>
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3 items-start">
            {pricingTiers.filter(t => t.id !== 'freemium').map((tier) => (
            <Card key={tier.id} className={tier.name === mockUser.tier ? 'border-2 border-primary' : ''}>
                <CardHeader className="text-center">
                <CardTitle className="text-2xl">{tier.name}</CardTitle>
                <CardDescription className="text-4xl font-bold">
                    {`${tier.priceMonthly} kr`}
                    <span className="text-sm font-normal text-muted-foreground">/mnd</span>
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                <ul className="space-y-3">
                    {tier.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                    </li>
                    ))}
                </ul>
                </CardContent>
                <CardFooter>
                {tier.name === mockUser.tier ? (
                    <Button disabled className="w-full">Nåværende Plan</Button>
                ) : (
                    <Button asChild className="w-full" variant={tier.isMostPopular ? 'default' : 'outline'}>
                        <Link href="#">{tier.cta}</Link>
                    </Button>
                )}
                </CardFooter>
            </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
