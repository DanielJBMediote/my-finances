import { ThemeProvider } from './components/theme-provider'
import { TransactionContextProvider } from './contexts/transaction-provider'
import { DictionaryProvider } from './contexts/translate-context'
import { Router } from './router'

export function App() {
  return (
    <DictionaryProvider storageKey="finance-manager-lang">
      <ThemeProvider storageKey="finance-manager-theme">
        <TransactionContextProvider>
          <Router />
        </TransactionContextProvider>
      </ThemeProvider>
    </DictionaryProvider>
  )
}
