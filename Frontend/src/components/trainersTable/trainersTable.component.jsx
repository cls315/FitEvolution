import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { getTrainers } from "../redux/actions/actions";

const TrainersTable = () => {
  const [data, setData] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTrainers());
  }, [dispatch]);

  const trainers = useSelector((state) => state.allTrainers);

  useEffect(() => {
    setData(trainers);
  }, [trainers]);
  const columns = [
    {
      header: "Nombre",
      accessorKey: "forename",
      footer: "Nombre del Entrenador",
    },
    {
      header: "Apellido",
      accessorKey: "surname",
      footer: "Apellido del Entrenador",
    },
    {
      header: "Fecha de nacimiento",
      accessorKey: "dateOfBirth",
      footer: "Fecha de Nacimineto del entrenador",
      cell: (info) => dayjs(info.getValue()).format("YYYY/MM/DD"),
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
    //   header: "Descripcion",
    //   accessorKey: "description",
    //   footer: "Especialidad",
    // },
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

  const tableTrainers = useReactTable({
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
        <span className="input-group-text" id="basic-addon1">
          {<CiSearch />}
        </span>
        <input
          className="form-control"
          placeholder="Buscar entrenador"
          aria-label="Username"
          aria-describedby="basic-addon1"
          type="text"
          value={filtering}
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <table className="table table-info">
        <thead>
          {tableTrainers.getHeaderGroups().map((headerGroup) => (
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
          {tableTrainers.getRowModel().rows.map((row) => (
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
          {tableTrainers.getFooterGroups().map((footerGroup) => (
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
          onClick={() => tableTrainers.setPageIndex(0)}
        >
          Primer página
        </button>
        <button
          className="btn btn-success btn-sm"
          onClick={() => tableTrainers.previousPage()}
        >
          Página anterior
        </button>
        <button
          className="btn btn-success btn-sm"
          onClick={() => tableTrainers.nextPage()}
        >
          Página siguiente
        </button>
        <button
          className="btn btn-success btn-sm"
          onClick={() =>
            tableTrainers.setPageIndex(tableTrainers.getPageCount() - 1)
          }
        >
          Última página
        </button>
      </div>
    </div>
  );
};

export default TrainersTable;
