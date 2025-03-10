import { useTransaction } from '@/contexts/transaction-provider'
import { useDictionary } from '@/contexts/translate-context'
import { getCatagoryChartData, getMonthlyChartData } from '@/utils/charts-utils'
import { getYear } from 'date-fns'
import { CategoryChart } from './category-chart'
import { MonthlyChart } from './monthly-chart'

export function Charts() {
  const { transactions } = useTransaction()
  const { dictionary } = useDictionary()

  const currentYear = getYear(new Date())
  const transactionsThisYear = transactions.filter((t) => getYear(new Date(t.createdAt)) === currentYear)

  const monthlyChart = getMonthlyChartData(transactionsThisYear)
  const categoryChart = getCatagoryChartData(transactionsThisYear, dictionary)

  return (
    <div className="grid grid-cols-3 gap-2">
      <MonthlyChart data={monthlyChart} />
      <CategoryChart data={categoryChart} />
    </div>
  )
}
