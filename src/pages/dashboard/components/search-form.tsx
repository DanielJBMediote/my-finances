import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { useDictionary } from '@/contexts/translate-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { Search } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'

const querySchema = zod.object({
  query: zod.string(),
})

interface SearchFormProps {
  onSearch: (query: string) => void
}

export function SearchForm({ onSearch }: SearchFormProps) {
  const { dictionary } = useDictionary()
  const methods = useForm({
    resolver: zodResolver(querySchema),
  })

  function handleSearch(data: zod.infer<typeof querySchema>) {
    onSearch(data.query)
  }

  return (
    <div className="flex flex-col gap-2">
      <Text>{dictionary.words['search']}:</Text>
      <form className="flex gap-2" onSubmit={methods.handleSubmit(handleSearch)}>
        <Input type="text" placeholder={dictionary.words['search_placeholder']} {...methods.register('query')} />
        <Button>
          <Search />
          {dictionary.words['search']}
        </Button>
      </form>
    </div>
  )
}
