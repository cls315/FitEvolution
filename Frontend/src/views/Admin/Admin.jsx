import React, { useEffect, useState } from "react";
import axios from "axios";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
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
import style from './Admin.module.css'
import { useDispatch } from "react-redux";
import { getBaner } from "../../components/redux/actions/actions";
import { IdealBankElement } from "@stripe/react-stripe-js";
import{
  TextField,
  Typography,
  AppBar,
  InputAdornment,
  Toolbar,TableBody, TableContainer, TableFooter, 
  TableHead,Paper, TableRow, TableCell,Table,Input,
  Grid,
  Button,
} from "@mui/material";



const Admin=()=>{
    const navigate = useNavigate()
   const ejectButton =()=>{
   navigate('/createEj')
   }
   const [data, setData] = useState([]);
   const [selectedRow, setSelectedRow] = useState(null);

 const backButton =()=>{
    navigate('/dashboardtr')
 }
 const [refresh,setRefresh]= useState(0)
   
   useEffect(() => {
    async function fetchData() {
      const dataClients = await axios("http://localhost:3001/fitevolution/clients");//Cambiar a ruta deploy
      setData(dataClients.data);
    }
    fetchData();
  }, [refresh]);
 
  const dispatch = useDispatch()


  const handleBaner = (e,id)=>{
    e.preventDefault()
   const result = getBaner(id,{banned:e.target.value})
   
    setRefresh(refresh+1)
  
  }

  const columns = [
    {
      header: "ID",
      accessorKey: "id",
      footer: "Id del deportista",
    },
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
      header: "Nacionalidad",
      accessorKey: "nationality",
      footer: "Nacionalidad del deportista",
    },
    {
      header: "Genero",
      accessorKey: "gender",
      footer: "Genero del deportista",
    },
    {
      header: "DNI",
      accessorKey: "dni",
      footer: "Dni del deportista",
    },
    {
      header: "Fecha de nacimiento",
      accessorKey: "dateOfBirth",
      footer: "Fecha de Nacimineto del deportista",
      cell: (info) => dayjs(info.getValue()).format("DD/MM/YYYY"),
    },

      {
        header: "BANNED",
        accessorKey: "banned",
        footer: "banned",
        cell:(info)=> info.row.original.banned==="off"?<Button style={{color:"red"}} onClick={(e)=>handleBaner(e,info.row.original.id)} value={"on"}>desbanear</Button>:
        <Button style={{color: "green"}} onClick={(e)=>handleBaner(e,info.row.original.id)} value={"off"}>banear</Button>
        
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

            <div style={{ display: 'flex', alignItems: 'center', marginRight: 'auto' }}>
                <Grid container spacing={2} justifyContent="center">
                  <Grid item>
                    <Button variant="contained" color="primary" onClick={ejectButton}>
                      Crear ejercicios
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" color="secondary" onClick={backButton}>
                      Salir
                    </Button>
                  </Grid>
                </Grid>
               </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              placeholder="Buscar Deportista"
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
              </Toolbar>
              </AppBar>
              
            <div>
               
      
         <Table className='table table-info'>
        
     
        </Table>
     
    </div>
            <div>
      <div className=" input-group flex-nowrap my-2">
       
      </div>
      <TableContainer component={Paper}>

      <Table className="table table-info">
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow TableRow key={headerGroup.id}>
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
       
        </div>

    )}


      



export default Admin; 