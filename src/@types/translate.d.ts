export interface TranslationType {
  locale: string
  categories: Record<string, string>
  flag: string
  app: App
  words: Record<string, string>
}

interface App {
  name: string
  description: string
}
