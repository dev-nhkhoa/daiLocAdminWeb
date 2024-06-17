import { useNavigate } from 'react-router-dom'
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useEffect, useMemo } from 'react'
import { tableMainRow } from '../../config.json'
import DefaultColumn from './DefaultColumn'
import { generateDonHangTemplate } from '#/lib/generateTemplate'
import donHangStore from '#/hooks/useDonHangStore'
import { api } from '#/hooks/useAuth'

function QuanLyDonHang() {
  // todo: refactor code
  // public to github
  const navigate = useNavigate()
  const columnHelper = useMemo(() => createColumnHelper(), [])

  const { listDonHang, setListDonHang, removeDonHang, addDonHang } = donHangStore()

  useEffect(() => {
    async function initialDonHang() {
      try {
        if (listDonHang.length > 0) return
        const response = await api.get('/danh-sach-don-hang')
        if (response.data.length === 0) {
          const template = generateDonHangTemplate(0)
          setListDonHang([template])
          localStorage.setItem(`donHang-${template.donHangId}`, JSON.stringify(template))
          return
        }
        setListDonHang(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    initialDonHang()
  }, [listDonHang.length, setListDonHang])

  const defaultColumn = useMemo(
    () =>
      columnHelper.accessor('', {
        cell: (props) => <DefaultColumn {...props} />,
      }),
    [columnHelper]
  )

  const tableColumn = useMemo(
    () =>
      tableMainRow.map((row) =>
        columnHelper.accessor(row.id, {
          header: row.name,
          size: row.size || 100,
        })
      ),
    [columnHelper]
  )

  const columns = useMemo(
    () => [
      ...tableColumn,
      {
        id: 'drag-handle',
        header: 'Thao tác',
        cell: ({ row }) => (
          <div className="flex gap-2">
            <button
              className="rounded-md bg-black px-1 text-white hover:text-blue-500"
              onClick={() => {
                console.log(row.original.donHangId)

                navigate(`./don-hang/${row.original.donHangId}`)
              }}
            >
              edit
            </button>
            <button
              onClick={async () => {
                if (!window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này không?')) return
                await api.delete('/don-hang', { data: { donHangId: row.original.donHangId } })

                removeDonHang(row.original.donHangId)
                localStorage.removeItem(`donHang-${row.original.donHangId}`)
                alert('Xóa thành công')
              }}
            >
              Xóa
            </button>
          </div>
        ),
        size: 30,
      },
    ],
    [navigate, removeDonHang, tableColumn]
  )

  const table = useReactTable({
    columns: [...columns],
    data: listDonHang,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: defaultColumn,
  })

  function add() {
    const donHang = generateDonHangTemplate(String(listDonHang[listDonHang.length - 1].donHangId).split('-')[1])

    addDonHang(donHang)
    localStorage.setItem(`donHang-${donHang.donHangId}`, JSON.stringify(donHang))
    navigate(`./don-hang/${donHang.donHangId}`)
  }

  async function saveAll() {
    for (const donHang of donHangStore.getState().listDonHang) {
      console.log(JSON.parse(localStorage.getItem(`donHang-${donHang.donHangId}`)))

      if (donHang._id) {
        await api.put(`/don-hang/${donHang.donHangId}`, { data: JSON.parse(localStorage.getItem(`donHang-${donHang.donHangId}`)) })
        continue
      }
      await api.post('/don-hang', { data: JSON.parse(localStorage.getItem(`donHang-${donHang.donHangId}`)) })
      localStorage.removeItem(`donHang-${donHang.donHangId}`)
    }
    alert('Lưu thành công')
  }

  return (
    <>
      <h1 className="text-left font-mono text-2xl font-bold">Danh sách đơn hàng:</h1>

      <div className="flex justify-center">
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
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="cursor-pointer">
                {row.getVisibleCells().map((cell) => {
                  return <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex w-full justify-end gap-2 py-4 text-yellow-300">
        <button className="rounded-md bg-slate-600 px-1 hover:text-white" onClick={add}>
          Tạo đơn hàng mới
        </button>
        <button className="rounded-md bg-slate-600 px-1 hover:text-white" onClick={saveAll}>
          Lưu tất cả chỉnh sửa
        </button>
      </div>
    </>
  )
}

export default QuanLyDonHang
