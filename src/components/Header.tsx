import { HandCoins } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { Text } from './ui/text'

import { useDictionary } from '@/contexts/translate-context'
import { AppMenu } from './AppMenu'
import { ButtonThemeToggler } from './ButtonThemeToggler'
import { LanguageSwitcher } from './LanguageSwitcher'
import { NewTransactionForm } from './NewTransactionForm'
import { Dialog } from './ui/dialog'

export function Header() {
  const { pathname } = useLocation()
  const { dictionary } = useDictionary()
  const pageName = pathname.split('/')

  return (
    <div className="bg-background flex justify-between px-6 pt-6 pb-3 shadow">
      <div className="flex items-center justify-center gap-2 font-semibold">
        <HandCoins />
        <Text className="text-muted-background">{dictionary.app.name}</Text>
        {` - `}
        <Text variant={'label'} className="text-muted-background capitalize">
          {pageName}
        </Text>
      </div>
      <div className="flex items-center gap-4">
        <ButtonThemeToggler />
        <LanguageSwitcher />
        <Dialog>
          <AppMenu />
          <NewTransactionForm />
        </Dialog>
      </div>
    </div>
  )
}
