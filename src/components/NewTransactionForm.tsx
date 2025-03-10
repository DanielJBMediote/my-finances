import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useTransaction } from '@/contexts/transaction-provider'
import { useDictionary } from '@/contexts/translate-context'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowDown, ArrowUp } from 'lucide-react'
import { useForm } from 'react-hook-form'
import * as zod from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './ui/form'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

const transactionSchema = zod.object({
  description: zod.string().min(1).max(100),
  amount: zod.number().min(0),
  category: zod.string().min(1).max(50),
  type: zod.enum(['income', 'outcome']),
  createdAt: zod.date(),
})

type TransactionType = zod.infer<typeof transactionSchema>

export function NewTransactionForm() {
  const { dictionary } = useDictionary()
  const methods = useForm({
    resolver: zodResolver(transactionSchema),
  })
  const { addTransaction } = useTransaction()

  const {
    register,
    control,
    formState: { isSubmitting },
  } = methods

  function handleCreateTransaction(data: TransactionType) {
    const { description, amount, category, type, createdAt } = data

    const categoryIndex = Object.values(dictionary.categories).findIndex((c) => c === category)
    const categoryValue = Object.keys(dictionary.categories)[categoryIndex]

    addTransaction({ description, amount, category: categoryValue, type, createdAt })
    methods.reset()
  }

  return (
    <DialogContent className="sm:max-w-2xl">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(handleCreateTransaction)}>
          <DialogHeader>
            <DialogTitle>{dictionary.words['new_transaction']}</DialogTitle>
            <DialogDescription>{dictionary.words['transaction_desc']}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description">{dictionary.words['description']}</Label>
              <Input id="description" className="col-span-3" {...register('description')} />
            </FormItem>
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount">{dictionary.words['amount']}</Label>
              <Input
                id="amount"
                type="number"
                step={0.01}
                min={0.01}
                className="col-span-3"
                {...register('amount', { valueAsNumber: true })}
              />
            </FormItem>
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category">{dictionary.words['category']}</Label>
              <FormField
                name="category"
                control={control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl className="sm:w-3xs">
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.values(dictionary.categories).map((category) => {
                            return (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            )
                          })}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )
                }}
              />
            </FormItem>
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type">{dictionary.words['type']}</Label>
              <FormField
                name="type"
                control={control}
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-y-1"
                        >
                          <FormItem className="flex items-center justify-center gap-2">
                            <FormControl>
                              <RadioGroupItem value="income" className="hidden" />
                            </FormControl>

                            <FormLabel
                              data-state={field.value === 'income' ? 'checked' : 'unchecked'}
                              className="cursor-pointer rounded border p-3 text-green-400 select-none hover:bg-green-50 data-[state=checked]:border-green-400 data-[state=checked]:bg-green-100"
                            >
                              <ArrowDown />
                              {dictionary.words['income']}
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center justify-center gap-2">
                            <FormControl>
                              <RadioGroupItem value="outcome" className="hidden" />
                            </FormControl>
                            <FormLabel
                              data-state={field.value === 'outcome' ? 'checked' : 'unchecked'}
                              className="cursor-pointer rounded border p-3 text-red-400 select-none hover:bg-red-50 data-[state=checked]:border-red-400 data-[state=checked]:bg-red-100"
                            >
                              <ArrowUp />
                              {dictionary.words['outcome']}
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </FormItem>
            <FormItem className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="createdAt">{dictionary.words['date']}</Label>
              <Input
                id="createdAt"
                type="date"
                {...register('createdAt', {
                  setValueAs: (value) => new Date(value),
                })}
              />
            </FormItem>
          </div>
          <DialogFooter>
            {/* <DialogClose asChild> */}
            <Button disabled={isSubmitting} type="submit" className="w-full cursor-pointer">
              Create
            </Button>
            {/* </DialogClose> */}
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  )
}
