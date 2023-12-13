const {Client}= require ("../../db")


const clientRole= async (req,res)=>{
    const {id}= req.params
try {
    console.log("ID recibido:", id);

    const {role}= req.body;

    const clientDb= await Client.findByPk(id)
    console.log("Resultado de la búsqueda:", clientDb);
    
    if(!clientDb){
        throw new Error("Cliente no encontrado")
    }

    const validRoles = ["Usuario", "Admin"];
    const normalizedRole = role.charAt(0).toUpperCase() + role.slice(1);

    if (!validRoles.includes(normalizedRole)) {
      throw new Error("El role debe ser 'Usuario' o 'Admin'");
    }

    if (normalizedRole === clientDb.role) {
      throw new Error(`El cliente ya tiene el role en '${role}'`);
    }

    clientDb.role = normalizedRole;
    await clientDb.save();
    
} catch (error) {
    throw new Error(`Error en la solicitud : ${error.message}`);
}

};

module.exports= clientRole;