const { Trainer } = require("../../db");

const filteredTrainers = (req, res) => {
  // Recibir parámetros de filtro desde la solicitud
  const focusTr = req.query.focusTr;
  const order = req.query.order; // Puede ser "asc" o "desc"

  // Procesar parámetros y construir la consulta
  const consulta = construirConsulta(focusTr, order);

  // Ejecutar la consulta (filtrar y ordenar los entrenadores)
  const entrenadoresFiltrados = ejecutarFiltradoYOrden(consulta);

  // Devolver los resultados al cliente
  res.json(entrenadoresFiltrados);
};

// Función para construir la consulta según los parámetros de filtro
function construirConsulta(focusTr, order) {
  // Aquí puedes construir la consulta según los parámetros recibidos
  // Puedes adaptar esto según el sistema de almacenamiento que estés utilizando
  const consulta = {};

  // Agrega el filtro por focusTr si se proporciona
  if (focusTr) {
    consulta.focusTr = focusTr;
  }

  // Agrega el ordenamiento por score si se proporciona
  if (order) {
    consulta.order = order;
  }

  return consulta;
}

// Función para ejecutar el filtrado y ordenamiento en los datos de entrenadores
function ejecutarFiltradoYOrden(consulta) {
  // Filtra los entrenadores según el focusTr
  let entrenadoresFiltrados = entrenadores;
  if (consulta.focusTr) {
    entrenadoresFiltrados = entrenadoresFiltrados.filter(
      (entrenador) => entrenador.focusTr === consulta.focusTr
    );
  }

  // Ordena los entrenadores según el score
  if (consulta.order === "asc") {
    entrenadoresFiltrados.sort((a, b) => a.score - b.score);
  } else if (consulta.order === "desc") {
    entrenadoresFiltrados.sort((a, b) => b.score - a.score);
  }

  return entrenadoresFiltrados;
}

module.exports = filteredTrainers;
