import { Text } from '@/components/ui/text'
import { formatToCurrency } from '@/lib/utils'
import { Transaction } from '@/reducers/transaction-reducer'
import { ColumnDef } from '@tanstack/react-table'
import { ActionButtons } from './actions'
import { CustomCategoryRowColumn, CustomDateRowColumn, CustomHeaderColumn, CustomTypeRowColumn } from './custom-columns'

export const transactionsColumns: ColumnDef<Transaction>[] = [
  {
    header: '#',
    cell: ({ row }) => <Text className="w-0">{row.index + 1}</Text>,
  },
  // {
  //   id: 'select',
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="bg-gray-200"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="bg-gray-200"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: 'description',
    header: ({ column }) => <CustomHeaderColumn column={column} name="description" />,
    cell: ({ row }) => <Text>{row.getValue('description')}</Text>,
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => {
      const formatted = formatToCurrency(row.getValue('amount'))
      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'type',
    header: ({ column }) => <CustomHeaderColumn column={column} name="type" />,
    cell: ({ row }) => <CustomTypeRowColumn row={row} />,
  },
  {
    accessorKey: 'category',
    header: ({ column }) => <CustomHeaderColumn column={column} name="category" />,
    cell: ({ row }) => <CustomCategoryRowColumn row={row} />,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => <CustomHeaderColumn column={column} name="date" />,
    cell: ({ row }) => <CustomDateRowColumn row={row} />,
  },
  {
    header: 'Actions',
    cell: ({ row }) => <ActionButtons transaction={row.original} />,
  },
]
