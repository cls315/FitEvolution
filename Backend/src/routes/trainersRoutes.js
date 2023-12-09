const { Router } = require("express");
const allTrainerHndls = require("../handlers/TrainersHndls/getAllTrainerHndls");
const postTrainerHdnls = require("../handlers/TrainersHndls/postTrainerHndls");
const postTrainerPuntuacionHdnls = require("../handlers/TrainersHndls/postTrainerPuntuacionHdnls");
const postTrainerStatusHdnls = require("../handlers/TrainersHndls/postTrainerStatusHdnls");
const getFilterFocusScoreHndls = require("../handlers/TrainersHndls/getFilterFocusScoreHndls");

const trainersRoutes = Router();

trainersRoutes.get("/allTrainer", allTrainerHndls);
trainersRoutes.get("/filter", getFilterFocusScoreHndls);
trainersRoutes.post("/", postTrainerHdnls);
trainersRoutes.post("/:id/puntuacion", postTrainerPuntuacionHdnls);
trainersRoutes.post("/:id/status", postTrainerStatusHdnls);

module.exports = trainersRoutes;
