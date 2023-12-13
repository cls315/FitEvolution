

import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { getTrainers } from "../../components/redux/actions/actions";
import { BsSortUpAlt, BsSortDown } from "react-icons/bs";
import { RxUpdate } from "react-icons/rx";
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import { Table,TextField,Typography,AppBar,InputAdornment,Toolbar,TableBody, TableContainer, TableFooter, TableHead,Paper, TableRow, TableCell } from "@mui/material";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import dayjs from "dayjs";
import  handleCheckboxChange from "./handlecheckbox";
const SuperAdmin = () => {
  //!manejo de los checkbox
  

  
  const dispatch = useDispatch();
  
  
  
  const trainers = useSelector(state => state.allTrainers);
  const [storLocal,setStorLocal]=useState(() => JSON.parse(localStorage.getItem("selectedAdmins")) || []);
 
  useEffect(() => {
    const handleStorageChange = () => {
      setStorLocal(JSON.parse(localStorage.getItem("selectedAdmins")));
    };
  
    handleStorageChange(); 

    window.addEventListener('storage', handleStorageChange);
  
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
 
  //!toda la información que utiliza ReactTable para presentarla
  const data = trainers; 
  console.log(data)
useEffect(()=>
{
  dispatch(getTrainers());
},[storLocal])  
  


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
    {
      header: "Rol",
      accessorKey: "role",
      footer: "Rol",
    },
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
      header: "Seleccione rol",
      footer: "Seleccione rol",
      id: "selection", 
      cell: ({ row }) => 
      //   <input
      // //   type="checkbox"
      //   checked={row.isSelected}
      //   onChange={() => {
        //     handleCheckboxChange(row.original.id);
        //   }}
      // /> 
      <Button
      variant="contained"
      color="primary"
      size="small"
      onClick={() => {handleCheckboxChange(row.original.id)
      }}
    >
      Cambiar Rol
    </Button>
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

      <AppBar position="static">
        <Toolbar>
        <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Super Admin
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
        <TextField
        fullWidth
        variant="outlined"
        margin="normal"
        placeholder="Buscar Entrenador"
        value={filtering}
        onChange={(e) => setFiltering(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
            <CiSearch/>
            </InputAdornment>
          ),
        }}
        sx={{ width: '400px' }}
        />
        </div>

        <Button color="inherit" component={Link} to="/">
          Exit
        </Button>
        </Toolbar>




      </AppBar>
      
<TableContainer component={Paper}> 
       <Table >
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableCell
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
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          {table.getFooterGroups().map((footerGroup) => (
            <TableRow key={footerGroup.id}>
              {footerGroup.headers.map((footer) => (
                <TableCell key={footer.id} className="blockquote-footer">
                  {flexRender(
                    footer.column.columnDef.footer,
                    footer.getContext()
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableFooter>
      </Table>
      </TableContainer>
      <div className="d-flex justify-content-between">
        <Button
          className="btn btn-success btn-sm"
          onClick={() => table.setPageIndex(0)}
        >
          Primer página
        </Button>
        <Button
          className="btn btn-success btn-sm"
          onClick={() => table.previousPage()}
        >
          Página anterior
        </Button>
        <Button
          className="btn btn-success btn-sm"
          onClick={() => table.nextPage()}
        >
          Página siguiente
        </Button>
        <Button
          className="btn btn-success btn-sm"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        >
          Última página
        </Button>
      </div>
    </div>
  );
};

export default SuperAdmin