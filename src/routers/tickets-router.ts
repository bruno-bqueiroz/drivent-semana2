import { Router } from "express";
import { getTicketsTypes, getTickets, createTicket } from "@/controllers/tickets-controller";
import { authenticateToken } from "@/middlewares";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTicketsTypes)
  .get("/types", getTickets)
  .post("/", createTicket);

export { ticketsRouter };

