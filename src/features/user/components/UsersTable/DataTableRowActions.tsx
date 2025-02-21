type DataTableRowActionsProps<TData> = {
    row: TData,
    onEdit: (data: TData) => void,
    onDelete: (data: TData) => void
}


const DataTableRowActions = <T,>({row, onEdit, onDelete}: DataTableRowActionsProps<T>) => {
    return <div className="">
        <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={() =>onEdit( row)}>Update </button>
        <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={() =>onDelete( row)}>Delete </button>
    </div>
}

export default DataTableRowActions