import { Router } from "express";
import { getpayments, processPayments } from "@/controllers/payments-controller";
import { authenticateToken } from "@/middlewares";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getpayments)
  .post("/process", processPayments);

export { paymentsRouter };
