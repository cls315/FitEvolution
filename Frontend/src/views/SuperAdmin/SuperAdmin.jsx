

import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getTrainers } from "../../components/redux/actions/actions";
import { BsSortUpAlt, BsSortDown } from "react-icons/bs";
import { RxUpdate } from "react-icons/rx";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";

const SuperAdmin = () => {
//!manejo de los checkbox
    const [selectedRows, setSelectedRows] = useState([]);
console.log(selectedRows)
    function toggleRowSelected(row) {

        const selectedIndex = selectedRows.findIndex(r => r.id === row.id);
      
        let newSelected = [];
      
        if(selectedIndex === -1) {
          // agregar la fila al array
          newSelected = [...selectedRows, row]; 
        } else {
         // sacar la fila del array
          newSelected = selectedRows.filter(r => r.id !== row.id);
        }
      
        setSelectedRows(newSelected); 
      }
  
const dispatch = useDispatch();
    
  useEffect(() => {
    dispatch(getTrainers())
  }, [dispatch]);

  const trainers = useSelector(state => state.allTrainers);

  
console.log(trainers)

//!toda la información que utiliza ReactTable para presentarla
const [data,setData]=useState([]);
useEffect(()=>{
    setData(trainers)
},[])
const columns = [
    {
      header: "ID",
      accessorKey: "id",
      footer: "Id del entrenador",
    },
    {
      header: "Nombre",
      accessorKey: "forename",
      footer: "Nombre del entrenador",
    },
    {
      header: "Apellido",
      accessorKey: "surname",
      footer: "Apellido del entrenador",
    },
    {
      header: "Correo",
      accessorKey: "email",
      footer: "Correo del entrenador",
    },
    {
      header: "Teléfono",
      accessorKey: "phoneN",
      footer: "Teléfono del entrenador",
    },
    // {
    //   header: "Nacionalidad",
    //   accessorKey: "nationality",
    //   footer: "Nacionalidad del entrenador",
    // },
    // {
    //   header: "Genero",
    //   accessorKey: "gender",
    //   footer: "Genero del entrenador",
    // },
    // {
    //   header: "DNI",
    //   accessorKey: "dni",
    //   footer: "Dni del entrenador",
    // },
    {
        header: "Seleccionar administrador",
        footer: "Seleccionar administrador",
        id: "selection", 
        cell: ({ row }) => {
          return (
            <input 
              type="checkbox"
              checked={selectedRows.includes(row)}
              onChange={() => toggleRowSelected(row)}  
            />
          )
        }
      },
   
  ];

  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div>
      <div className=" input-group flex-nowrap my-2">
        <span class="input-group-text" id="basic-addon1">
          {<CiSearch />}
        </span>
        <input
          class="form-control"
          placeholder="Buscar Entrenador"
          aria-label="Username"
          aria-describedby="basic-addon1"
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <table className="table table-info">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  className="bg-info bg-opacity-50"
                  role="button"
                  scope="col"
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}{" "}
                  {{ asc: <BsSortUpAlt />, desc: <BsSortDown /> }[
                    header.column.getIsSorted() ?? null
                  ] ?? <RxUpdate />}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <th key={footer.id} className="blockquote-footer">
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="d-flex justify-content-between">
        <button
          className="btn btn-success btn-sm"
          onClick={() => table.setPageIndex(0)}
        >
          Primer página
        </button>
        <button
          className="btn btn-success btn-sm"
          onClick={() => table.previousPage()}
        >
          Página anterior
        </button>
        <button
          className="btn btn-success btn-sm"
          onClick={() => table.nextPage()}
        >
          Página siguiente
        </button>
        <button
          className="btn btn-success btn-sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Última página
        </button>
      </div>
    </div>
  );
};

export default SuperAdmin