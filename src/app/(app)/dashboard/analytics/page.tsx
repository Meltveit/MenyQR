"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockUser, mockAnalytics } from "@/lib/data";
import { Lock, ArrowRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import Link from 'next/link';

export default function AnalyticsPage() {
  const hasAccess = mockUser.tier === 'Silver' || mockUser.tier === 'Gold';

  const chartConfig = {
    views: {
      label: "Visninger",
      color: "hsl(var(--primary))",
    },
    clicks: {
      label: "Klikk",
      color: "hsl(var(--secondary))",
    }
  };

  if (!hasAccess) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center">
        <div className="p-8 border-dashed border-2 rounded-xl">
            <Lock className="h-12 w-12 text-muted-foreground mx-auto" />
            <h2 className="mt-6 text-2xl font-bold">Detaljert Analyse er en Premium-funksjon</h2>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
            Oppgrader til Silver-pakken for å få full innsikt i menyens ytelse, inkludert klikk per rett og månedlige rapporter.
            </p>
            <Button className="mt-6" asChild>
                <Link href="/dashboard/subscription">
                    Oppgrader Nå <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Analyse</h1>
      <p className="text-muted-foreground">Få innsikt i hvordan dine menyer presterer.</p>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Totale Visninger</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{mockAnalytics.totalViews.toLocaleString('nb-NO')}</div>
            <p className="text-sm text-muted-foreground">+20.1% fra forrige måned</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Visninger per dag (siste uke)</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <BarChart accessibilityLayer data={mockAnalytics.viewsByDay}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} tickMargin={10} axisLine={false} />
                <YAxis />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="views" fill="var(--color-views)" radius={8} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mest populære retter</CardTitle>
          </CardHeader>
          <CardContent>
             <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
              <BarChart accessibilityLayer data={mockAnalytics.topItems} layout="vertical">
                <CartesianGrid horizontal={false} />
                <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} tickMargin={10} width={80} />
                <XAxis type="number" hide />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <Bar dataKey="clicks" fill="var(--color-clicks)" radius={5} layout="vertical" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
