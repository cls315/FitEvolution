const getEnfoqueRoutines = require("../../controllers/Routine/getEnfoqueRoutines");

async function getEnfoqueRutinesHndls(req, res) {
  const enfoque = req.params.enfoque;
  try {
    // const pokemonsDB = await getPokemonsFromDB(name);

    // const jsonPokemons = pokemonsDB.map((pokemon) => {
    //   pokemon.source = 'Created';
    //   return pokemon;
    // });

    const rutinesByEnfoque = await getEnfoqueRoutines(enfoque);
    console.log(rutinesByEnfoque);

    res.json(rutinesByEnfoque); // res.json(pokemonsAPI.concat(jsonPokemons));
  } catch (err) {
    console.log(err);
    res.status(404).json({ err: "Ocurrió un error" });
  }
}

module.exports = getEnfoqueRutinesHndls;
