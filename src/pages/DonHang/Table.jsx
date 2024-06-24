import { closestCenter, DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React, { useCallback, useMemo } from 'react'
import DefaultColumn from './DefaultColumn'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import { tableHeaderRow } from '../../config.json'
import { CSS } from '@dnd-kit/utilities'
import { resetString } from '#/lib/formatCurrency'

const DraggableRow = React.memo(function DraggableRow({ row }) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.original.sanPhamId,
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition,
    opacity: isDragging ? 0.8 : 1,
    zIndex: isDragging ? 1 : 0,
    position: 'relative',
  }
  return (
    // connect row ref to dnd-kit, apply important styles
    <tr ref={setNodeRef} style={style}>
      {row.getVisibleCells().map((cell) => {
        const cellContext = cell.getContext()
        return (
          <td key={cell.id} style={{ width: cell.column.getSize() }}>
            {flexRender(cell.column.columnDef.cell, cellContext)}
          </td>
        )
      })}
    </tr>
  )
})

const RowDragHandleCell = React.memo(function RowDragHandleCell({ rowId, children }) {
  const { attributes, listeners } = useSortable({
    id: rowId,
  })
  return (
    <div className="flex gap-3">
      <button {...attributes} {...listeners} style={{ border: 'hidden', backgroundColor: '#ffffff' }}>
        🟰
      </button>
      {children}
    </div>
  )
})

const Table = React.memo(function Table({ listSanPham, setListSanPham }) {
  const sanPhamIds = useMemo(() => listSanPham.map((sanPham) => sanPham.sanPhamId), [listSanPham])

  // reorder rows after drag & drop
  const handleDragEnd = (event) => {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setListSanPham((oldListSanPham) => {
        const oldIndex = sanPhamIds.indexOf(active.id)
        const newIndex = sanPhamIds.indexOf(over.id)
        return arrayMove(oldListSanPham, oldIndex, newIndex)
      })
    }
  }

  const columnHelper = useMemo(() => createColumnHelper(), [])

  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

  const defaultColumn = columnHelper.accessor('', {
    cell: (props) => <DefaultColumn getValue={props.getValue} row={props.row} column={props.column} table={props.table} />,
  })

  const newColumns = useCallback(
    () =>
      tableHeaderRow.map((header) => {
        return columnHelper.accessor(header.id, {
          header: header.name,
          size: header.size || 100,
        })
      }),
    [columnHelper]
  )

  const columns = useMemo(
    () => [
      {
        id: 'drag-handle',
        header: '',
        cell: ({ row }) => (
          <RowDragHandleCell rowId={row.id}>
            <button
              onClick={() => {
                setListSanPham((oldListSanPham) => oldListSanPham.filter((item) => item.sanPhamId !== row.id))
              }}
            >
              Xóa
            </button>
          </RowDragHandleCell>
        ),
        size: 30,
      },
      ...newColumns(),
    ],
    [newColumns]
  )

  const table = useReactTable({
    columns: columns,
    data: listSanPham,
    defaultColumn: defaultColumn,
    getRowId: (row) => {
      return row.sanPhamId
    },
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateData: (rowIndex, columnId, value) => {
        setListSanPham((oldListSanPham) => {
          return oldListSanPham.map((sanPham, index) => {
            if (index === rowIndex) {
              return { ...sanPham, [columnId]: value }
            } else {
              return sanPham
            }
          })
        })
      },
    },
  })

  const calculateTotal = useCallback(() => {
    const thanhTienBanHang = listSanPham.reduce((total, sanPham) => {
      return sanPham.giaBan == '' || sanPham.soLuong == '' ? total : total + parseFloat(resetString(sanPham.giaBan)) * parseFloat(sanPham.soLuong)
    }, 0)

    const thanhTienNhapHang = listSanPham.reduce((total, sanPham) => {
      return sanPham.giaBan == '' || sanPham.soLuong == '' ? total : total + parseFloat(resetString(sanPham.giaNhap)) * parseFloat(sanPham.soLuong)
    }, 0)

    const loiNhuan = parseFloat(thanhTienBanHang) - parseFloat(thanhTienNhapHang)

    return { thanhTienBanHang, thanhTienNhapHang, loiNhuan }
  }, [listSanPham])

  const { thanhTienBanHang, thanhTienNhapHang, loiNhuan } = calculateTotal(listSanPham)

  return (
    <DndContext collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd} sensors={sensors}>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          <SortableContext items={sanPhamIds} strategy={verticalListSortingStrategy}>
            {table.getRowModel().rows.map((row) => (
              <DraggableRow key={row.id} row={row} />
            ))}
          </SortableContext>
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={7} className="text-left font-bold text-red-500">
              Tổng cộng:
            </th>

            <th>{thanhTienNhapHang.toLocaleString()}</th>
            <th>{thanhTienBanHang.toLocaleString()}</th>
            <th>{loiNhuan.toLocaleString()}</th>

            {/* Tổng thành tiền giá nhập */}
          </tr>
        </tfoot>
      </table>
    </DndContext>
  )
})

export default Table
