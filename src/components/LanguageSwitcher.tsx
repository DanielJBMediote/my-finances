import { Select, SelectContent, SelectItem, SelectTrigger } from '@/components/ui/select'
import { useDictionary } from '@/contexts/translate-context'
import { BR, US } from 'country-flag-icons/react/3x2'

export function LanguageSwitcher() {
  const { lang, setLang } = useDictionary()

  return (
    <Select defaultValue={lang} onValueChange={setLang}>
      <SelectTrigger className="w-12 border-none">{lang === 'pt-BR' ? <BR /> : <US />}</SelectTrigger>
      <SelectContent>
        <SelectItem value="en-US">English</SelectItem>
        <SelectItem value="pt-BR">Portuguese</SelectItem>
      </SelectContent>
    </Select>
  )
}
