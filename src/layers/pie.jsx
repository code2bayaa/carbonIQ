"use client"

import { TrendingUp } from "lucide-react"
import { Pie, PieChart } from "recharts"

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

export const description = "A pie chart with a label"



// const chartConfig = {
//             organic: {
//                 label: "organic",
//             },
//             recyclable_plastic: {
//                 label: "recyclable plastic",
//                 color: "var(--chart-1)",
//             },
//             recyclable_paper: {
//                 label: "recyclable paper",
//                 color: "var(--chart-2)",
//             },
//             recyclable_glass: {
//                 label: "recyclable glass",
//                 color: "var(--chart-3)",
//             },
//             e_waste: {
//                 label: "e waste",
//                 color: "var(--chart-4)",
//             },
//             mixed: {
//                 label: "mixed",
//                 color: "var(--chart-5)",
//             },
// } 

export function ChartPieLabel({classes, description, chartConfig, chartData}) {
    console.log(chartData)
  return (
    <Card className={`flex flex-col ${classes}`}>
      <CardHeader className="items-center pb-0">
        {/* <CardTitle>Pie Chart - Label</CardTitle> */}
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0 text-white">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-pie-label-text]:fill-foreground mx-auto aspect-square max-h-[250px] pb-0"
        >
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="sites" label nameKey="waste" />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total sites for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
