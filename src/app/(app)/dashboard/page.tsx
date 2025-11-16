import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { mockUser, mockAnalytics } from "@/lib/data";
import { Eye, UtensilsCrossed } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';


export default function DashboardPage() {
  const chartConfig = {
    views: {
      label: "Visninger",
      color: "hsl(var(--primary))",
    },
  };
  
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Velkommen tilbake, {mockUser.name.split(' ')[0]}!</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totale Visninger</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.totalViews.toLocaleString('nb-NO')}</div>
            <p className="text-xs text-muted-foreground">+20.1% fra forrige måned</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mest Klikkede Rett</CardTitle>
            <UtensilsCrossed className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockAnalytics.topItems[0].name}</div>
            <p className="text-xs text-muted-foreground">{mockAnalytics.topItems[0].clicks} klikk</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Menyvisninger denne uken</CardTitle>
            <CardDescription>En oversikt over daglige visninger.</CardDescription>
          </CardHeader>
          <CardContent>
          <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
            <BarChart accessibilityLayer data={mockAnalytics.viewsByDay}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="views" fill="var(--color-views)" radius={4} />
            </BarChart>
          </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Topp 5 Retter</CardTitle>
            <CardDescription>De mest populære rettene på menyen din.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {mockAnalytics.topItems.map((item) => (
                <li key={item.name} className="flex items-center justify-between">
                  <span className="font-medium">{item.name}</span>
                  <span className="text-muted-foreground">{item.clicks.toLocaleString('nb-NO')} klikk</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
