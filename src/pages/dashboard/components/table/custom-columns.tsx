import { Button } from '@/components/ui/button'
import { useDictionary } from '@/contexts/translate-context'
import { Transaction } from '@/reducers/transaction-reducer'
import { formatDateByLang } from '@/utils/date-utils'
import { Column, Row } from '@tanstack/react-table'
import { ArrowBigDown, ArrowBigUp, ArrowUpDown } from 'lucide-react'
import { capitalize } from '../../../../utils/string-utils'

interface CustomHeaderColumnProps {
  column: Column<Transaction, unknown>
  name: string
}

export function CustomHeaderColumn({ column, name }: CustomHeaderColumnProps) {
  const { dictionary } = useDictionary()
  return (
    <div className="flex items-center gap-2">
      {dictionary ? dictionary.words[name] : capitalize(name)}
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        <ArrowUpDown />
      </Button>
    </div>
  )
}

export function CustomTypeRowColumn({ row }: { row: Row<Transaction> }) {
  const { dictionary } = useDictionary()
  const transType = row.original.type
  if (transType === 'income') {
    return (
      <div className="flex items-end gap-0.5 font-semibold text-green-400">
        <ArrowBigUp size={16} fill="#05df72" />
        {dictionary.words['income']}
      </div>
    )
  } else {
    return (
      <div className="flex items-end gap-0.5 font-semibold text-red-400">
        <ArrowBigDown size={16} fill="#df0505" />
        {dictionary.words['outcome']}
      </div>
    )
  }
}
export function CustomCategoryRowColumn({ row }: { row: Row<Transaction> }) {
  const { dictionary } = useDictionary()

  const value: string = row.getValue('category')

  const categoryIndex = Object.keys(dictionary.categories).findIndex((key) => key === value)
  const category = Object.values(dictionary.categories)[categoryIndex]
  return category
}
export function CustomDateRowColumn({ row }: { row: Row<Transaction> }) {
  const { dictionary } = useDictionary()
  return formatDateByLang(new Date(row.original.createdAt), dictionary.words['transaction_date_format'])
}
