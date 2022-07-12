const { Router } = require("express");
const { createCheckOutSession} = require("../controllers/payment.controller");
const paymentRouter = Router();
//http://localhost:7000/api/v1/payment
paymentRouter.post("/create-checkout-session",createCheckOutSession);
module.exports = {
    paymentRouter
}