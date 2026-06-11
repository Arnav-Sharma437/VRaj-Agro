import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  loading?: boolean;
}

export function DataTable<T extends { _id?: string }>({
  data,
  columns,
  onEdit,
  onDelete,
  loading = false,
}: DataTableProps<T>) {
  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
        <thead className="bg-gray-100">
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className="px-6 py-4 text-gray-700 font-semibold text-sm uppercase">
                {col.header}
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="px-6 py-4 text-gray-700 font-semibold text-sm uppercase text-right">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {loading ? (
            // Skeleton loader
            Array.from({ length: 5 }).map((_, sIdx) => (
              <tr key={sIdx} className="animate-pulse border-b border-gray-100">
                {columns.map((_, cIdx) => (
                  <td key={cIdx} className="px-6 py-4">
                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 flex justify-end gap-2">
                    <div className="h-4 bg-gray-200 rounded w-10"></div>
                    <div className="h-4 bg-gray-200 rounded w-10"></div>
                  </td>
                )}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className="px-6 py-8 text-center text-gray-500">
                No items found.
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr key={row._id || rowIdx} className="hover:bg-gray-50/50 transition-colors border-b border-gray-100 text-gray-800">
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className="px-6 py-4 whitespace-nowrap align-middle">
                    {typeof col.accessor === 'function'
                      ? col.accessor(row)
                      : (row[col.accessor] as React.ReactNode)}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className="px-6 py-4 whitespace-nowrap text-right align-middle">
                    <div className="inline-flex justify-end gap-3 w-full">
                      {onEdit && (
                        <button onClick={() => onEdit(row)} className="text-[#2d6a4f] hover:text-[#1b4332] font-semibold text-xs transition-colors">
                          Edit
                        </button>
                      )}
                      {onDelete && (
                        <button onClick={() => onDelete(row)} className="text-red-650 hover:text-red-800 font-semibold text-xs transition-colors">
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
