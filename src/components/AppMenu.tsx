import { DialogTrigger } from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTransaction } from '@/contexts/transaction-provider'
import { useDictionary } from '@/contexts/translate-context'
import { formatDateByLang } from '@/utils/date-utils'
import { exportToXLSX } from '@/utils/export-file-sheets'
import { MenuIcon, UploadIcon } from 'lucide-react'
import { NavLink } from 'react-router-dom'

export function AppMenu() {
  const { transactions } = useTransaction()
  const { dictionary } = useDictionary()

  function handleExportFile() {
    const transformTrans = transactions.map((t) => ({
      description: t.description,
      type: dictionary.words[t.type],
      category: t.category,
      createdAt: formatDateByLang(t.createdAt, dictionary.words['transaction_date_format']),
    }))
    exportToXLSX(transformTrans, 'transactions')
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer hover:shadow">
        <MenuIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48">
        <NavLink to="/dashboard">
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
        </NavLink>
        <DialogTrigger asChild>
          <DropdownMenuItem>{dictionary.words['new_transaction']}</DropdownMenuItem>
        </DialogTrigger>
        {/* <DropdownMenuItem>{dictionary.words['compare_to']}</DropdownMenuItem>
        <DropdownMenuItem>{dictionary.words['reports']}</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>{dictionary.words['import_export']}</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleExportFile}>
            <UploadIcon /> {dictionary.words['export_to_csv']}
          </DropdownMenuItem>
          {/* <DropdownMenuItem className="flex content-center items-center gap-2">
            <DownloadIcon /> {dictionary.words['import_from_csv']}
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
