import { TranslationType } from '@/@types/translate'
import tsJson from '@/lang/en-US.json'
import { createContext, useContext, useEffect, useState } from 'react'

type Lang = 'pt-BR' | 'en-US'

type DictionaryProviderProps = {
  children: React.ReactNode
  defaultLang?: Lang
  storageKey?: string
}

type LangProviderState = {
  lang: Lang
  dictionary: TranslationType
  setLang: (lang: Lang) => void
}

const initialState: LangProviderState = {
  lang: 'en-US',
  dictionary: tsJson as unknown as TranslationType,
  setLang: () => null,
}

const DictionaryProviderContext = createContext<LangProviderState>(initialState)

export function DictionaryProvider({
  children,
  defaultLang = 'en-US',
  storageKey = 'vite-lang',
  ...props
}: DictionaryProviderProps) {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem(storageKey) as Lang) || defaultLang)
  const [dictionary, setDictionary] = useState<TranslationType>(initialState.dictionary)

  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const response = await import(`@/lang/${lang}.json`)
        setDictionary(response.default)
      } catch (error) {
        console.error('Erro ao carregar o idioma:', error)
      }
    }
    loadDictionary()
  }, [lang])

  const value = {
    lang: lang,
    dictionary,
    setLang: (theme: Lang) => {
      localStorage.setItem(storageKey, theme)
      setLang(theme)
    },
  }

  return (
    <DictionaryProviderContext.Provider {...props} value={value}>
      {children}
    </DictionaryProviderContext.Provider>
  )
}

export const useDictionary = () => {
  const context = useContext(DictionaryProviderContext)

  if (context === undefined) throw new Error('useAppLanguage must be used within a TranslateProvider')

  return context
}
