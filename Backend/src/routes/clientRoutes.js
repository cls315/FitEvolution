const { Router } = require("express");

const postClient = require("../controllers/Clients/postClient");

const allClientHndls = require("../handlers/ClientsHndls/getAllClientsHndls");

const putClientHndls =require ("../handlers/ClientsHndls/putClientHndls")

const clientRoutes = Router();

clientRoutes.post("/", postClient);

clientRoutes.get("/", allClientHndls);

clientRoutes.put("/:id/banned", putClientHndls)

module.exports = clientRoutes;
