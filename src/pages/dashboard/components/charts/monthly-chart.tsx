import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { getYear } from 'date-fns'
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts'

type DataType = {
  month: string
  income: number
  outcome: number
}

const chartConfig = {
  income: {
    label: 'Income',
    color: '#4ade80',
  },
  outcome: {
    label: 'Outcome',
    color: '#f87171',
  },
} satisfies ChartConfig

interface MonthlyChartProps {
  data: DataType[]
}

export function MonthlyChart({ data }: MonthlyChartProps) {
  const currentYear = getYear(new Date())

  return (
    <Card className="col-span-2 flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Monthly Chart</CardTitle>
        <CardDescription>January - December {currentYear}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[250px] w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent className="min-sm:w-40" />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="income" fill="var(--color-income)" radius={4} />
            <Bar dataKey="outcome" fill="var(--color-outcome)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
