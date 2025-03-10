import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { useTransaction } from '@/contexts/transaction-provider'
import { useDictionary } from '@/contexts/translate-context'
import { formatToCurrency } from '@/lib/utils'
import { CreditCard, DollarSign, HandCoins } from 'lucide-react'

export function Summary() {
  const { transactions } = useTransaction()
  const { dictionary } = useDictionary()

  const summary = transactions.reduce(
    (acc, trans) => {
      if (trans.type === 'income') {
        acc.totalIncomeAmount += trans.amount
        acc.totalAmount += trans.amount
        acc.totalTransIncome++
      } else {
        acc.totalOutcomeAmount += trans.amount
        acc.totalAmount -= trans.amount
        acc.totalTransOutcome++
      }
      acc.totalTransactions++
      return acc
    },
    {
      totalIncomeAmount: 0,
      totalTransIncome: 0,
      totalOutcomeAmount: 0,
      totalTransOutcome: 0,
      totalAmount: 0,
      totalTransactions: 0,
    }
  )

  return (
    <div className="grid w-full grid-cols-3 gap-2">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-muted-foreground font-bold">{dictionary.words['total_income']}</CardTitle>
            <div className="rounded-full bg-green-100 p-2 dark:border dark:bg-transparent">
              <HandCoins className="text-green-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Text variant={'title'}>{formatToCurrency(summary.totalIncomeAmount)}</Text>
          <Text className="font-bold">{summary.totalTransIncome}</Text>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-muted-foreground font-bold">{dictionary.words['total_outcome']}</CardTitle>
            <div className="rounded-full bg-red-100 p-2 dark:border dark:bg-transparent">
              <CreditCard className="text-red-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Text variant={'title'}>-{formatToCurrency(summary.totalOutcomeAmount)}</Text>
          <Text className="font-bold">{summary.totalTransOutcome}</Text>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="text-background flex items-center justify-between">
            <CardTitle className="text-muted-foreground font-bold">{dictionary.words['total_balance']}</CardTitle>
            <div className="rounded-full bg-indigo-200 p-2 dark:border dark:bg-transparent">
              <DollarSign className="text-indigo-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <Text variant={'title'}>{formatToCurrency(summary.totalAmount)}</Text>
          <Text className="font-bold">{summary.totalTransactions}</Text>
        </CardContent>
      </Card>
    </div>
  )
}
