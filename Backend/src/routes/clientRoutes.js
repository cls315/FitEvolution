const { Router } = require("express");

const postClient = require("../controllers/Clients/postClient");
const postCompleteClientsHndls = require("../handlers/ClientsHndls/postCompleteClientsHndls");

const allClientHndls = require("../handlers/ClientsHndls/getAllClientsHndls");
const getCartClientHndls = require("../handlers/CartHndls/getCardClientHdnls");

const putClientHndls = require("../handlers/ClientsHndls/putClientBannedHndls");

const clientRoutes = Router();

clientRoutes.post("/", postClient);
clientRoutes.post("/:id/complete", postCompleteClientsHndls);
clientRoutes.get("/:id/cart", getCartClientHndls);

clientRoutes.get("/", allClientHndls);

clientRoutes.put("/:id/banned", putClientHndls);

module.exports = clientRoutes;




// const { Router } = require("express");

// const postClient = require("../controllers/Clients/postClient");
// const postCompleteClientsHndls = require("../handlers/ClientsHndls/postCompleteClientsHndls");

// const allClientHndls = require("../handlers/ClientsHndls/getAllClientsHndls");

// const putClientHndls =require ("../handlers/ClientsHndls/putClientBannedHndls")

// const clientRoutes = Router();

// clientRoutes.post("/", postClient);
// clientRoutes.post("/:id/complete", postCompleteClientsHndls);

// clientRoutes.get("/", allClientHndls);

// clientRoutes.put("/:id/banned", putClientHndls)



// module.exports = clientRoutes;
