const { Router } = require("express");

const postCarrito = require("../handlers/CarritoHndls/postCarrito");

const carritoRoutes = Router();

carritoRoutes.post("/", postCarrito);
