const verifyInputs= (form,checkErr)=>{
    if (Object.values(form).some(inp => inp==="")) {  //some comprueba si algun elemento del array es "", si hay un "" quiere decir que hay un input vacio
        alert("DEBÉS COMPLETAR TODOS LOS CAMPOS!");
        return;
    }
    
    if (Object.values(checkErr).some(error => error)) {
        alert("LOS CAMPOS TIENEN ERRORES!");
        return;
    }
}

export default verifyInputs