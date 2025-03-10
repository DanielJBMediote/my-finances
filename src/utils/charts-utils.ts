import { TranslationType } from '@/@types/translate'
import { Transaction } from '@/reducers/transaction-reducer'
import { format } from 'date-fns'

type DataType = {
  month: string
  income: number
  outcome: number
}

export function getMonthlyChartData(transactions: Transaction[]) {
  // Objeto auxiliar para agrupar valores por mês
  const chartData: DataType[] = []

  Array.from({ length: 11 }).map((_, mIndex) => {
    const transByMonth = transactions.filter((t) => new Date(t.createdAt).getMonth() === mIndex)
    const monthExtend = format(new Date(2025, mIndex, 1), 'MMMM')
    chartData[mIndex] = transByMonth.reduce(
      (acc, trans) => {
        if (trans.type === 'income') {
          acc.income += trans.amount
        } else {
          acc.outcome += trans.amount
        }

        return acc
      },
      { month: monthExtend, outcome: 0, income: 0 }
    )
  })
  return chartData
}

export function getCatagoryChartData(transactions: Transaction[], dictionary: TranslationType) {
  const result = transactions.reduce(
    (acc, item) => {
      const categoryItem = item.category.toLowerCase()
      const categoryDictionary = Object.keys(dictionary.categories).find((v) => v === categoryItem)
      if (!acc[item.category]) {
        acc[item.category] = {
          category: categoryDictionary || categoryItem,
          quantity: 0,
          fill: `var(--color-${categoryItem})`,
        }
      }
      acc[item.category].quantity++
      return acc
    },
    {} as Record<string, { category: string; quantity: number; fill: string }>
  )
  return Object.values(result)
}
