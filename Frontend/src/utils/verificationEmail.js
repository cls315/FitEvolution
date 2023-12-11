const verificationEmail=(email,allTrainers,allDeportistas,typeSession)=>{

   const usuarioDB1=allTrainers.filter(userDB=>userDB.email===email)
   const usuarioDB2=allDeportistas.filter(userDB=>userDB.email===email)

    if (typeSession=== "Deportistas" && usuarioDB1.length!==0) throw Error("el email ya esta registrado como entrenador")

    if (typeSession=== "Entrenadores" && usuarioDB2.length!==0) throw Error("el email ya esta registrado como deportista")
        
}
  

export default verificationEmail;