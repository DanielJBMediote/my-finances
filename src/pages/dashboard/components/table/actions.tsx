import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useTransaction } from '@/contexts/transaction-provider'
import { Transaction } from '@/reducers/transaction-reducer'
import { PencilIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'

export function ActionButtons({ transaction }: { transaction: Transaction }) {
  const { removeTransaction } = useTransaction()

  const [confirmTrans, setConfirmTrans] = useState<Transaction | null>(null)

  function handleRemoveTransaction() {
    if (confirmTrans) {
      removeTransaction(confirmTrans.id)
      setConfirmTrans(null)
    }
  }

  return (
    <div className="flex w-8 gap-1">
      <Dialog>
        <Button variant={'outline'} title="Edit">
          <PencilIcon />
        </Button>
        <DialogTrigger asChild>
          <Button variant={'destructive'} title="Delete" onClick={() => setConfirmTrans(transaction)}>
            <Trash2Icon />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Are you sure you want to remove this transaction?</DialogTitle>
          <p>
            <strong>Transaction:</strong> {transaction.description}
          </p>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={'outline'} onClick={() => setConfirmTrans(null)}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant={'destructive'} onClick={handleRemoveTransaction}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
