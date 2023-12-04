import React, { useEffect, useState } from "react";
// import axios from "axios";
import { CiSearch } from "react-icons/ci";
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
import { useDispatch } from "react-redux";
import { getTrainers } from "../redux/actions/actions";

const TrainersTable = () => {
  // Esto tiene que venir del redux(store)
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrainers());
    // async function fetchData() {
    //   const dataClients = await axios(GET_TRAINERS);
    //   setData(dataClients.data);
    // }
    // fetchData();
  }, [dispatch]);

  const columns = [
    {
      header: "Nombre",
      accessorKey: "forename",
      footer: "Nombre del deportista",
    },
    {
      header: "Apellido",
      accessorKey: "surname",
      footer: "Apellido del deportista",
    },
    {
      header: "Fecha de nacimiento",
      accessorKey: "dateOfBirth",
      footer: "Fecha de Nacimineto del deportista",
      cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
    },
    {
      header: "Correo",
      accessorKey: "email",
      footer: "Correo del deportista",
    },
    {
      header: "Teléfono",
      accessorKey: "phoneN",
      footer: "Teléfono del deportista",
    },
    {
      header: "Descripcion",
      accessorKey: "description",
      footer: "Especialidad",
    },
    {
      header: "Enfoque",
      accessorKey: "focusTr",
      footer: "Enfoque de entrenamiento",
    },
    {
      header: "Fecha de creacion",
      accessorKey: "createdAt",
      footer: "Inicio de cuenta",
    },
    {
      header: "Cant. Suscriptores",
      accessorKey: "subscribers",
      footer: "Lista de suscriptores",
    },
    {
      header: "Score",
      accessorKey: "score",
      footer: "Puntuacion promedio",
    },
    //FALTA AGREGAR ESTADO DE CUENTA {
    //   header: "Score",
    //   accessorKey: "score",
    //   footer: "Puntuacion promedio",
    // },
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
          placeholder="Buscar deportista"
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

export default TrainersTable;
