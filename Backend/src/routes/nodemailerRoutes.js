const { Router } = require("express");
//const { sendWelcomeEmail }= require("../../configNodemailer/nodemailer")
const welcomeEmailHndls = require("../handlers/NodemailerHndls/nodemailerHndls");
const getEmailPromotionHndls =require ("../handlers/NodemailerHndls/getEmailPromotionHndls")
const postEmailPromoHndls= require("../handlers/NodemailerHndls/postEmailPromotionHndls")

const nodemailer = Router();

nodemailer.post("/", welcomeEmailHndls);
nodemailer.get("/email", getEmailPromotionHndls)
nodemailer.post("/sendEmail", postEmailPromoHndls)

module.exports = nodemailer;
