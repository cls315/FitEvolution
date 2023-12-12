const { Router } = require("express");
const allTrainerHndls = require("../handlers/TrainersHndls/getAllTrainerHndls");
const postTrainerHdnls = require("../handlers/TrainersHndls/postTrainerHndls");
const postTrainerPuntuacionHdnls = require("../handlers/TrainersHndls/postTrainerPuntuacionHdnls");
const postTrainerStatusHdnls = require("../handlers/TrainersHndls/postTrainerStatusHdnls");
const getFilterFocusScoreHndls = require("../handlers/TrainersHndls/getFilterFocusScoreHndls");
const {
  updateTrainer,
} = require("../handlers/TrainersHndls/updateTrainerhndl");
const postCompleteTrainerHndls = require("../handlers/TrainersHndls/postCompleteTrainerHndls");

const trainersRoutes = Router();

trainersRoutes.get("/allTrainer", allTrainerHndls);
trainersRoutes.get("/filter", getFilterFocusScoreHndls);
trainersRoutes.post("/", postTrainerHdnls);
trainersRoutes.post("/:id/complete", postCompleteTrainerHndls);
trainersRoutes.post("/:id/puntuacion", postTrainerPuntuacionHdnls);
trainersRoutes.post("/:id/status", postTrainerStatusHdnls);
trainersRoutes.put("/:id", updateTrainer);

module.exports = trainersRoutes;
