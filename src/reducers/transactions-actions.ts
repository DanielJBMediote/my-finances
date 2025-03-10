import { Transaction } from './transaction-reducer'

export enum TransactionActionType {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface TransactionActions {
  type: TransactionActionType
  payload: {
    transactions: Transaction[]
    transaction?: Transaction
  }
}

export function createTransaction(data: Transaction): TransactionActions {
  return {
    type: TransactionActionType.CREATE,
    payload: {
      transaction: data,
      transactions: []
    },
  }
}

export function deleteTransaction(data: Transaction): TransactionActions {
  return {
    type: TransactionActionType.DELETE,
    payload: {
      transaction: data,
      transactions: []
    },
  }
}
