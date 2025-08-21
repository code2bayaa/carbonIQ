"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// export const description = "An interactive area chart"

const chartData = [
  { date: "2024-04-01", unsafe: 222, safe: 150 },
  { date: "2024-04-02", unsafe: 97, safe: 180 },
  { date: "2024-04-03", unsafe: 167, safe: 120 },
  { date: "2024-04-04", unsafe: 242, safe: 260 },
  { date: "2024-04-05", unsafe: 373, safe: 290 },
  { date: "2024-04-06", unsafe: 301, safe: 340 },
  { date: "2024-04-07", unsafe: 245, safe: 180 },
  { date: "2024-04-08", unsafe: 409, safe: 320 },
  { date: "2024-04-09", unsafe: 59, safe: 110 },
  { date: "2024-04-10", unsafe: 261, safe: 190 },
  { date: "2024-04-11", unsafe: 327, safe: 350 },
  { date: "2024-04-12", unsafe: 292, safe: 210 },
  { date: "2024-04-13", unsafe: 342, safe: 380 },
  { date: "2024-04-14", unsafe: 137, safe: 220 },
  { date: "2024-04-15", unsafe: 120, safe: 170 },
  { date: "2024-04-16", unsafe: 138, safe: 190 },
  { date: "2024-04-17", unsafe: 446, safe: 360 },
  { date: "2024-04-18", unsafe: 364, safe: 410 },
  { date: "2024-04-19", unsafe: 243, safe: 180 },
  { date: "2024-04-20", unsafe: 89, safe: 150 },
  { date: "2024-04-21", unsafe: 137, safe: 200 },
  { date: "2024-04-22", unsafe: 224, safe: 170 },
  { date: "2024-04-23", unsafe: 138, safe: 230 },
  { date: "2024-04-24", unsafe: 387, safe: 290 },
  { date: "2024-04-25", unsafe: 215, safe: 250 },
  { date: "2024-04-26", unsafe: 75, safe: 130 },
  { date: "2024-04-27", unsafe: 383, safe: 420 },
  { date: "2024-04-28", unsafe: 122, safe: 180 },
  { date: "2024-04-29", unsafe: 315, safe: 240 },
  { date: "2024-04-30", unsafe: 454, safe: 380 },
  { date: "2024-05-01", unsafe: 165, safe: 220 },
  { date: "2024-05-02", unsafe: 293, safe: 310 },
  { date: "2024-05-03", unsafe: 247, safe: 190 },
  { date: "2024-05-04", unsafe: 385, safe: 420 },
  { date: "2024-05-05", unsafe: 481, safe: 390 },
  { date: "2024-05-06", unsafe: 498, safe: 520 },
  { date: "2024-05-07", unsafe: 388, safe: 300 },
  { date: "2024-05-08", unsafe: 149, safe: 210 },
  { date: "2024-05-09", unsafe: 227, safe: 180 },
  { date: "2024-05-10", unsafe: 293, safe: 330 },
  { date: "2024-05-11", unsafe: 335, safe: 270 },
  { date: "2024-05-12", unsafe: 197, safe: 240 },
  { date: "2024-05-13", unsafe: 197, safe: 160 },
  { date: "2024-05-14", unsafe: 448, safe: 490 },
  { date: "2024-05-15", unsafe: 473, safe: 380 },
  { date: "2024-05-16", unsafe: 338, safe: 400 },
  { date: "2024-05-17", unsafe: 499, safe: 420 },
  { date: "2024-05-18", unsafe: 315, safe: 350 },
  { date: "2024-05-19", unsafe: 235, safe: 180 },
  { date: "2024-05-20", unsafe: 177, safe: 230 },
  { date: "2024-05-21", unsafe: 82, safe: 140 },
  { date: "2024-05-22", unsafe: 81, safe: 120 },
  { date: "2024-05-23", unsafe: 252, safe: 290 },
  { date: "2024-05-24", unsafe: 294, safe: 220 },
  { date: "2024-05-25", unsafe: 201, safe: 250 },
  { date: "2024-05-26", unsafe: 213, safe: 170 },
  { date: "2024-05-27", unsafe: 420, safe: 460 },
  { date: "2024-05-28", unsafe: 233, safe: 190 },
  { date: "2024-05-29", unsafe: 78, safe: 130 },
  { date: "2024-05-30", unsafe: 340, safe: 280 },
  { date: "2024-05-31", unsafe: 178, safe: 230 },
  { date: "2024-06-01", unsafe: 178, safe: 200 },
  { date: "2024-06-02", unsafe: 470, safe: 410 },
  { date: "2024-06-03", unsafe: 103, safe: 160 },
  { date: "2024-06-04", unsafe: 439, safe: 380 },
  { date: "2024-06-05", unsafe: 88, safe: 140 },
  { date: "2024-06-06", unsafe: 294, safe: 250 },
  { date: "2024-06-07", unsafe: 323, safe: 370 },
  { date: "2024-06-08", unsafe: 385, safe: 320 },
  { date: "2024-06-09", unsafe: 438, safe: 480 },
  { date: "2024-06-10", unsafe: 155, safe: 200 },
  { date: "2024-06-11", unsafe: 92, safe: 150 },
  { date: "2024-06-12", unsafe: 492, safe: 420 },
  { date: "2024-06-13", unsafe: 81, safe: 130 },
  { date: "2024-06-14", unsafe: 426, safe: 380 },
  { date: "2024-06-15", unsafe: 307, safe: 350 },
  { date: "2024-06-16", unsafe: 371, safe: 310 },
  { date: "2024-06-17", unsafe: 475, safe: 520 },
  { date: "2024-06-18", unsafe: 107, safe: 170 },
  { date: "2024-06-19", unsafe: 341, safe: 290 },
  { date: "2024-06-20", unsafe: 408, safe: 450 },
  { date: "2024-06-21", unsafe: 169, safe: 210 },
  { date: "2024-06-22", unsafe: 317, safe: 270 },
  { date: "2024-06-23", unsafe: 480, safe: 530 },
  { date: "2024-06-24", unsafe: 132, safe: 180 },
  { date: "2024-06-25", unsafe: 141, safe: 190 },
  { date: "2024-06-26", unsafe: 434, safe: 380 },
  { date: "2024-06-27", unsafe: 448, safe: 490 },
  { date: "2024-06-28", unsafe: 149, safe: 200 },
  { date: "2024-06-29", unsafe: 103, safe: 160 },
  { date: "2024-06-30", unsafe: 446, safe: 400 },
]

const chartConfig = {
  sites: {
    label: "sites",
  },
  unsafe: {
    label: "unsafe",
    color: "var(--chart-1)",
  },
  safe: {
    label: "safe",
    color: "var(--chart-2)",
  },
}

export function ChartAreaInteractive({classes}) {
  const [timeRange, setTimeRange] = React.useState("90d")

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date)
    const referenceDate = new Date("2024-06-30")
    let daysToSubtract = 90
    if (timeRange === "30d") {
      daysToSubtract = 30
    } else if (timeRange === "7d") {
      daysToSubtract = 7
    }
    const startDate = new Date(referenceDate)
    startDate.setDate(startDate.getDate() - daysToSubtract)
    return date >= startDate
  })

  return (
    <Card className={`pt-0 ${classes}`}>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1">
          {/* <CardTitle>Area Chart - Interactive</CardTitle> */}
          <CardDescription>
            Showing safety of all sites for the last 3 months
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="hidden w-[160px] rounded-lg sm:ml-auto sm:flex"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillUnsafe" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-unsafe)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-unsafe)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillSafe" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-safe)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-safe)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="safe"
              type="natural"
              fill="url(#fillSafe)"
              stroke="var(--color-safe)"
              stackId="a"
            />
            <Area
              dataKey="unsafe"
              type="natural"
              fill="url(#fillUnsafe)"
              stroke="var(--color-unsafe)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
