import { createColumnHelper } from "@tanstack/react-table"
import { User } from "../../types/user"
import DataTableRowActions from "./DataTableRowActions"
import UserStatus from "./UserStatus"


const columnHelper = createColumnHelper<User & { actions: unknown}>()

export const getUserTableColumns = ({openUserModal, openDeleteConfirmationModal}:{ openUserModal: (row : User) => void, openDeleteConfirmationModal: (row : User) => void}) => [

  columnHelper.accessor('name', {
    cell: info => info.getValue()
  }),
  columnHelper.accessor(row => row.email, {
    id: 'Email',
    cell: info => info.getValue()
  }),
  columnHelper.accessor('ssn', {
    header: () => 'Ssn',
    cell: info => info.renderValue()
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    cell: ({row: {original}}) => <UserStatus user={original} />
  }),
  columnHelper.accessor('phone', {
    header: 'Phone'
  }),
  columnHelper.accessor('actions', {
    id: 'actions',
    cell: ({row: {original}}) => <DataTableRowActions row={original} onEdit={openUserModal} onDelete={openDeleteConfirmationModal} />
  }),
]
