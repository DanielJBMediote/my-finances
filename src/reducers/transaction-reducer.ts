import * as Immer from 'immer'

import { TransactionActions, TransactionActionType } from './transactions-actions'

type Transactiontype = 'income' | 'outcome'

export interface Transaction {
  id: number
  description: string
  amount: number
  type: Transactiontype
  category: string
  createdAt: Date 
}

interface TransactionState {
  transactions: Transaction[]
}

export function useTransactionReducer(state: TransactionState, actions: TransactionActions): TransactionState {
  switch (actions.type) {
    case TransactionActionType.CREATE: {
      const newState = Immer.produce(state, (draft) => {
        if (actions.payload.transaction) {
          draft.transactions.push(actions.payload.transaction)
        }
      })
      return newState
    }
    case TransactionActionType.DELETE: {
      const newState = Immer.produce(state, (draft) => { 
        const temptrans = actions.payload.transaction;
        if (temptrans) {
          const index = draft.transactions.findIndex((t) => t.id === temptrans.id)
          if (index >= 0) {
            draft.transactions.splice(index, 1)
          }
        }
      })
      return newState
    }
    default:
      return state
  }
}
