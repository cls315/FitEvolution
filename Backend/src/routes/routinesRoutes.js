const { Router } = require("express");
const getRoutinesHndls = require("../handlers/RoutineHndls/getRoutinesHndls");
const getEnfoqueRutinesHndls = require("../handlers/RoutineHndls/getEnfoqueRutinesHndls");
const postRoutinesHndls = require("../handlers/RoutineHndls/postRoutinesHndls");

const routinesRoutes = Router();

routinesRoutes.get("/allRoutines", getRoutinesHndls);
routinesRoutes.get("/:enfoque", getEnfoqueRutinesHndls);

routinesRoutes.post("/", postRoutinesHndls);

module.exports = routinesRoutes;
