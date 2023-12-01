const { Router } = require("express");

const postClient = require("../controllers/Clients/postClient");

const allClientHndls = require("../handlers/ClientsHndls/getAllClientsHndls");

const clientRoutes = Router();

clientRoutes.post("/", postClient);

clientRoutes.get("/", allClientHndls);

module.exports = clientRoutes;
