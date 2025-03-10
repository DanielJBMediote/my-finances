'use client'

import { Pie, PieChart } from 'recharts'

import { TranslationType } from '@/@types/translate'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { useDictionary } from '@/contexts/translate-context'
import enJson from '@/lang/en-US.json'
import { getYear } from 'date-fns'

interface CategoryChartData {
  category: string
  quantity: number
  fill: string
}

interface CategoryChartType {
  data: CategoryChartData[]
}

export function CategoryChart({ data }: CategoryChartType) {
  const { dictionary } = useDictionary()
  const chartConfig = getChartConfigByDictionary(dictionary)
  console.log(chartConfig)

  const currentYear = getYear(new Date())

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Category Chart</CardTitle>
        <CardDescription>January - December {currentYear}</CardDescription>
      </CardHeader>
      <CardContent className="aspect-auto flex-1 pb-0">
        <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
          <PieChart>
            <Pie data={data} dataKey="quantity" />
            <ChartTooltip content={<ChartTooltipContent className="min-sm:w-40" />} />
            <ChartLegend
              content={<ChartLegendContent nameKey="category" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

function getChartConfigByDictionary(dictionary: TranslationType) {
  const categories = Object.values(dictionary.categories)
  const values = Object.fromEntries(
    Object.keys(enJson.categories).map((c, idx) => [
      c.toLowerCase(),
      { label: categories[idx], color: `var(--chart-${idx + 1})` },
    ])
  )

  return {
    quantity: {
      label: dictionary.words['quantity'],
    },
    ...values,
  } satisfies ChartConfig
}
