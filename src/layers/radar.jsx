"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A radar chart with a grid and circle fill"

const chartData = [
  { month: "January", area: 186 },
  { month: "February", area: 285 },
  { month: "March", area: 237 },
  { month: "April", area: 203 },
  { month: "May", area: 209 },
  { month: "June", area: 264 },
]

const chartConfig = {
  area: {
    label: "area",
    color: "var(--chart-1)",
  },
} 

export function ChartRadarGridCircleFill({classes}) {
  return (
    <Card className={`${classes}`}>
      <CardHeader className="items-center pb-4">
        {/* <CardTitle>Radar Chart - Grid Circle Filled</CardTitle> */}
        <CardDescription>
          measurement area changes over time
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={chartData}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarGrid
              className="fill-(--color-area) opacity-20"
              gridType="circle"
            />
            <PolarAngleAxis dataKey="month" />
            <Radar
              dataKey="area"
              fill="var(--color-area)"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          January - June 2025
        </div>
      </CardFooter>
    </Card>
  )
}
