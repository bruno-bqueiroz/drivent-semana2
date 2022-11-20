import { Router } from "express";
import { getTicketsTypes } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getTicketsTypes);

export { paymentsRouter };
