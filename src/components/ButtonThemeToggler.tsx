import { Moon, Sun } from 'lucide-react'
import { useTheme } from './theme-provider'
import { Button } from './ui/button'

export function ButtonThemeToggler() {
  const { theme, setTheme } = useTheme()

  return (
    <Button variant={'ghost'} onClick={() => setTheme(theme == 'dark' ? 'light' : 'dark')}>
      {theme == 'dark' ? <Sun /> : <Moon />}
    </Button>
  )
}
