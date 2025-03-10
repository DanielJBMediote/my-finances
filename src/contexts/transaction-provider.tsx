import { Transaction, useTransactionReducer } from '@/reducers/transaction-reducer'
import { createTransaction, deleteTransaction } from '@/reducers/transactions-actions'
import { createContext, PropsWithChildren, useContext, useEffect, useReducer } from 'react'

interface TransactionContextProps {
  transactions: Transaction[]

  addTransaction: (trans: Omit<Transaction, 'id'>) => void
  removeTransaction: (transId: number) => void
}

const TransactionContext = createContext({} as TransactionContextProps)

export function TransactionContextProvider({ children }: PropsWithChildren) {
  const [transactionState, dispatch] = useReducer(
    useTransactionReducer,
    {
      transactions: [],
    },
    (initialState) => {
      const transStorage = localStorage.getItem('@my-finances:transactions-v1.0.0')

      if (transStorage) {
        initialState.transactions = JSON.parse(transStorage)
      }

      return initialState
    }
  )

  const { transactions } = transactionState

  function addTransaction(transaction: Omit<Transaction, 'id'>) {
    const newTransaction = {
      id: Date.now(),
      ...transaction,
    }
    dispatch(createTransaction(newTransaction))
  }

  function removeTransaction(transId: number) {
    const transaction = transactions.find((t) => t.id === transId)
    if (transaction) dispatch(deleteTransaction(transaction))
  }

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem('@my-finances:transactions-v1.0.0', JSON.stringify(transactions))
    }
  }, [transactions])

  return (
    <TransactionContext.Provider value={{ transactions, addTransaction, removeTransaction }}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransaction() {
  const context = useContext(TransactionContext)

  if (!context) {
    throw new Error('useTransaction must be used within a TransactionContextProvider')
  }

  return context
}
