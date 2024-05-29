/* eslint-disable react/prop-types */
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'

import { useState, useMemo, useCallback, useEffect } from 'react'
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { closestCenter, DndContext, KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from '@dnd-kit/core'

import { CSS } from '@dnd-kit/utilities'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers'
import DefaultColumn from './DefaultColumn'
import { tableHeaderRow } from '../../config.json'
import { useNavigate, useParams } from 'react-router-dom'

import { CustomerInput, CustomerText } from './components/CustomerInfo'
import DonHangButton from './components/DonHangButton'
import { api } from '#/App'
import { getDonHang } from '#/lib/zustand/ListDonHangStore'
import { generateSanPhamTemplate } from '#/lib/generateTemplate'

const DonHang = () => {
  // add tính năng tự động lưu đơn hàng khi thay đổi thông tin khách hàng
  const { donHangId } = useParams()
  const navigate = useNavigate()

  const [donHang, setDonHang] = useState(
    localStorage.getItem(`donHang-${donHangId}`)
      ? JSON.parse(localStorage.getItem(`donHang-${donHangId}`)).donHangId === donHangId
        ? JSON.parse(localStorage.getItem(`donHang-${donHangId}`))
        : getDonHang(donHangId)
      : getDonHang(donHangId)
  )

  const [listSanPham, setListSanPham] = useState(donHang.listSanPham || [])

  const sanPhamIds = useMemo(() => listSanPham.map((sanPham) => sanPham.sanPhamId), [listSanPham])

  useEffect(() => {
    const interval = setInterval(() => {
      setListSanPham((oldListSanPham) => oldListSanPham)
      setDonHang((oldHoaDon) => {
        const newHoaDon = oldHoaDon
        newHoaDon.listSanPham = listSanPham

        return newHoaDon
      })

      localStorage.setItem(`donHang-${donHangId}`, JSON.stringify(donHang))
    }, 1000)
    return () => clearInterval(interval)
  }, [listSanPham, donHang, donHangId])

  const RowDragHandleCell = ({ rowId }) => {
    const { attributes, listeners } = useSortable({
      id: rowId,
    })
    return (
      <button {...attributes} {...listeners} style={{ border: 'hidden', backgroundColor: '#ffffff' }}>
        🟰
      </button>
    )
  }
  // Row Component
  const DraggableRow = ({ row }) => {
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
  }

  // function handle click buttons
  function addNewRow() {
    setListSanPham((oldListSanPham) => [...oldListSanPham, { ...generateSanPhamTemplate() }])
    setDonHang((oldHoaDon) => {
      const newHoaDon = oldHoaDon
      newHoaDon.listSanPham = listSanPham

      return newHoaDon
    })
  }

  async function handleSaveDonHang() {
    const dbList = await api.get('/danh-sach-don-hang')

    try {
      if (dbList.data.filter((item) => item.donHangId === donHangId).length > 0) {
        await api.put(`/don-hang/${donHangId}`, { data: donHang })
      } else {
        await api.post('/don-hang', { data: donHang })
      }
      alert('Lưu thành công')
    } catch (error) {
      console.log(error)
    }
    localStorage.removeItem(`donHang-${donHangId}`)
  }

  // reorder rows after drag & drop
  function handleDragEnd(event) {
    const { active, over } = event
    if (active && over && active.id !== over.id) {
      setListSanPham((oldListSanPham) => {
        const oldIndex = sanPhamIds.indexOf(active.id)
        const newIndex = sanPhamIds.indexOf(over.id)
        return arrayMove(oldListSanPham, oldIndex, newIndex)
      })
      setDonHang((oldHoaDon) => {
        const newHoaDon = oldHoaDon
        newHoaDon.listSanPham = listSanPham

        return newHoaDon
      })
    }
  }

  const sensors = useSensors(useSensor(MouseSensor, {}), useSensor(TouchSensor, {}), useSensor(KeyboardSensor, {}))

  const columnHelper = createColumnHelper()

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
        cell: ({ row }) => <RowDragHandleCell rowId={row.id} />,
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

  return (
    <DndContext collisionDetection={closestCenter} modifiers={[restrictToVerticalAxis]} onDragEnd={handleDragEnd} sensors={sensors}>
      <h1 className="text-left font-mono text-2xl font-bold">{'Đơn hàng:'}</h1>
      <div className="flex flex-col gap-1">
        <CustomerText title="Ngày Tạo Đơn" data={donHang.ngayTaoDon} />
        <CustomerText title="Mã Đơn Hàng" data={donHang.donHangId} />
        <CustomerText title="Tình Trạng Thanh Toán" data={donHang.thanhToan == true ? 'Đã thanh toán' : 'Chưa thanh toán'} />
        <CustomerInput title="Tên Khách Hàng" data={donHang.tenKhachHang} input={setDonHang} />
        <CustomerInput title="Số Điện Thoại" data={donHang.soDienThoai} input={setDonHang} />
        <CustomerInput title="Địa chỉ công trình" data={donHang.diaChi} input={setDonHang} />
      </div>
      <div className="pt-2">
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
        </table>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          paddingTop: '16px',
        }}
      >
        <div style={{ display: 'flex', gap: 2 }}>
          <DonHangButton title="Thêm 1 dòng" handleFunction={addNewRow} />
          <DonHangButton title="Lưu đơn hàng" handleFunction={handleSaveDonHang} />
          <DonHangButton title="Xuất file báo giá" handleFunction={() => navigate(`../export/bao-gia/${donHang.donHangId}`)} />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <DonHangButton title="Xuất file giao hàng" handleFunction={handleSaveDonHang} />
          <DonHangButton title="Ghi nhận thanh toán" handleFunction={handleSaveDonHang} />
        </div>
      </div>
    </DndContext>
  )
}

export default DonHang
