"use client"

import * as React from "react"
import { Pie, PieChart, Label } from "recharts"

import {
  Card,
  CardContent,
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
import { AggDataItem } from "@/types"

// Backend data
// const backendData = [
//   { _id: "PAID", count: 2, total: 300000 },
//   { _id: "OVERDUE", count: 1, total: 13200 },
//   { _id: "DRAFT", count: 1, total: 220000 },
//   { _id: "SENT", count: 4, total: 162400 },
// ]

// Map backend data into chart-compatible format
// const chartData = backendData.map((item, index) => ({
//   status: item._id,
//   count: item.count,
//   total: item.total,
//   fill: `hsl(var(--chart-${index + 1}))`,
// }))

// const chartConfig = chartData.reduce((acc, curr) => {
//   acc[curr.status] = {
//     label: curr.status,
//     color: curr.fill,
//   }
//   return acc
// }, {} as ChartConfig)

export function ChartComp({ aggData }: { aggData: AggDataItem[] }) {
  const chartData = aggData.map((item, index) => ({
    status: item._id,
    count: item.count,
    total: item.total,
    fill: `hsl(var(--chart-${index + 1}))`,
  }))

  const chartConfig = chartData.reduce((acc, curr) => {
    acc[curr.status] = {
      label: curr.status,
      color: curr.fill,
    }
    return acc
  }, {} as ChartConfig)

  const totalInvoices = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.count, 0)
  }, [chartData])

  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="items-center pb-0">
        <CardTitle className="text-lg font-semibold">Invoice Overview</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="status"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalInvoices.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {totalInvoices > 1 ? "Invoices" : "Invoice"}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {aggData.length} Invoice Categories
        </div>
      </CardFooter> */}
    </Card>
  )
}
