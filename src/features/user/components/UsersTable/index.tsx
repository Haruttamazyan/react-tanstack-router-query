import { flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { User } from "../../types/user"
import { getUserTableColumns } from "./TableCoulumns"
import { useMemo } from "react"
import { useDeleteUser } from "../../hooks/useDeleteUser"
import { useEditUser } from "../../hooks/useEditUser"
import { useSearchInput } from "../../hooks/useSearchInput"

type UserTableProps = {
    users: User[]
}

const UsersTable = ({users}: UserTableProps) => {
    const data = useSearchInput<User>(users)

    const openDeleteConfirmationModal = useDeleteUser()
    const openUserModal = useEditUser()

    const columns = useMemo(() => getUserTableColumns({ openUserModal, openDeleteConfirmationModal }), [openUserModal, openDeleteConfirmationModal]);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const table = useReactTable<any>({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    })


    return (
        <>
            <table className="w-full  text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id} className="px-6 py-3" >
                        {headerGroup.headers.map(header => (
                            <th key={header.id} colSpan={header.colSpan} className="px-6 py-3">
                            {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                )}
                            </th>
                        ))}
                        </tr>
                    ))}

                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id} className="px-6 py-4">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                        </tr>
                    ))}
                    
                    
                </tbody>
            </table>
            <div className="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4 shadow-none">
                <span className=" font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing
                    <span className="font-semibold text-gray-900 dark:text-white"> {(table.getState().pagination.pageIndex) * 10}-{(table.getState().pagination.pageIndex) * 10 + 10} </span>
                    of  
                    <span className="font-semibold text-gray-900 dark:text-white"> {table.getPrePaginationRowModel().rows.length}</span>
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                    <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="flex items-center justify-center px-3 h-8  font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white mr-2">
                        Prev
                    </button>
                    <button onClick={() => table.nextPage()}  disabled={!table.getCanNextPage()} className="flex items-center justify-center px-3 h-8  font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                        Next
                    </button>
                </div>
            </div>
        </>
    )
}

export default UsersTable


