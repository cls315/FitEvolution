const verificationEmailAccount=(allUser,typeSession,user)=>{
    const usuarioDB=allUser.filter(userDB=>userDB.email===user.email)
    console.log(allUser)
    console.log(usuarioDB)
    if (usuarioDB.length!==0 && typeSession=== "Deportistas") throw Error ("el email ya esta registrado como entrenador")
    if (usuarioDB.length!==0 && typeSession=== "Entrenadores") throw Error ("el email ya esta registrado como deportista")
}

export default verificationEmailAccount;