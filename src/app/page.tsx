import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, CheckCircle, Smartphone, Sparkles, QrCode as QrCodeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { pricingTiers } from '@/lib/data';

export default function Home() {
  const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

  const features = [
    {
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      title: 'Mobilvennlig Design',
      description: 'Menyene dine ser fantastiske ut på alle enheter, fra mobiltelefoner til nettbrett.',
    },
    {
      icon: <Sparkles className="h-8 w-8 text-primary" />,
      title: 'Enkel Redigering',
      description: 'Oppdater retter, priser og kategorier på sekunder med vårt intuitive dra-og-slipp-verktøy.',
    },
    {
      icon: <QrCodeIcon className="h-8 w-8 text-primary" />,
      title: 'QR-Kode Generering',
      description: 'Få unike, nedlastbare QR-koder som gir kundene dine umiddelbar tilgang til menyen.',
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <QrCodeIcon className="h-8 w-8 text-primary" />
          <span className="text-2xl font-bold">MenyQR</span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Logg inn</Link>
          </Button>
          <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link href="/register">
              Start Gratis <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-20 md:py-32">
          <div className="absolute inset-0">
             {heroImage && (
                <Image
                    src={heroImage.imageUrl}
                    alt={heroImage.description}
                    fill
                    className="object-cover"
                    data-ai-hint={heroImage.imageHint}
                />
            )}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Den moderne måten å presentere menyen din på
            </h1>
            <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto">
              Bytt ut papirmenyer med en elegant, digital løsning. Enkel å opprette, umiddelbart oppdatert, og elsket av kunder.
            </p>
            <div className="mt-10">
              <Button size="lg" asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/register">
                  Opprett din gratis meny nå <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-20 bg-muted/40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Alt du trenger for en digital meny
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Fra design til analyse, MenyQR gir deg verktøyene for å lykkes.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 mx-auto">
                    {feature.icon}
                  </div>
                  <h3 className="mt-6 text-xl font-bold">{feature.title}</h3>
                  <p className="mt-2 text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">
                Priser som passer din bedrift
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Start gratis og oppgrader når du er klar. Velg mellom månedlig eller årlig (spar 20%).
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-1 lg:grid-cols-3 items-start">
              {pricingTiers.map((tier) => (
                <Card key={tier.id} className={tier.isMostPopular ? 'border-2 border-primary shadow-2xl' : ''}>
                  <CardHeader className="text-center">
                    {tier.isMostPopular && (
                      <div className="text-sm font-bold text-primary uppercase">Mest Populære</div>
                    )}
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription className="text-4xl font-bold">
                      {tier.priceMonthly === 0 ? 'Gratis' : `${tier.priceMonthly} kr`}
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
                    <Button asChild className="w-full" variant={tier.isMostPopular ? 'default' : 'outline'}>
                      <Link href="/register">{tier.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted/40 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MenyQR. Alle rettigheter reservert.</p>
        </div>
      </footer>
    </div>
  );
}
