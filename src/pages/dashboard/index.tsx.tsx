import { useTransaction } from '@/contexts/transaction-provider'
import { useState } from 'react'
import { Charts } from './components/charts'
import { SearchForm } from './components/search-form'
import { Summary } from './components/summary'
import { Transactions } from './components/table'

export function Dashboard() {
  const { transactions } = useTransaction()
  const [query, setQuery] = useState('')

  const filteredTransactions = transactions.filter((t) => t.description.includes(query))

  return (
    <div className="flex flex-col gap-4 px-6 py-4">
      <Charts />
      <Summary />
      <SearchForm onSearch={setQuery} />
      <Transactions data={filteredTransactions} />
    </div>
  )
}
