const { Router } = require("express");

const postClient = require("../controllers/Clients/postClient");

const allClientHndls = require("../handlers/ClientsHndls/getAllClientsHndls");

const putClientHndls =require ("../handlers/ClientsHndls/putClientBannedHndls")

const putClientRoleHndls  = require ("../handlers/ClientsHndls/putClientRoleHndls")

const clientRoutes = Router();

clientRoutes.post("/", postClient);

clientRoutes.get("/", allClientHndls);

clientRoutes.put("/banned/:id", putClientHndls)

clientRoutes.put ("/role/:id", putClientRoleHndls)

module.exports = clientRoutes;
