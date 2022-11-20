import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import { Response } from "express";
import ticketsService from "@/services/tickets-service";
import enrollmentsService from "@/services/enrollments-service";
import { TicketStatus } from "@prisma/client";

export async function getTicketsTypes(req: AuthenticatedRequest, res: Response) {
  console.log(req);
  const userId  = req.userId;

  try {
    const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
    if(!enrollment) return res.sendStatus(httpStatus.NOT_FOUND);
    const enrollmentId = enrollment.id;
    const ticketWithType = await ticketsService.getTicketWithTypeByEnrollmentId(enrollmentId);
        
    if(ticketWithType.id) {
      return res.status(httpStatus.OK).send(ticketWithType);
    } else return;
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
    if(!enrollment) return res.sendStatus(httpStatus.NOT_FOUND);
    const enrollmentId = enrollment.id;
    const ticket = await ticketsService.getTicketByEnrollmentId(enrollmentId);
        
    return res.status(httpStatus.OK).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function createTicket(req: AuthenticatedRequest, res: Response) {
  const { ticketTypeId } = req.body;
  const { userId } = req;
  if(!ticketTypeId) res.sendStatus(httpStatus.BAD_REQUEST);
  
  try {
    const enrollment = await enrollmentsService.getOneWithAddressByUserId(userId);
    if(!enrollment) return res.sendStatus(httpStatus.NOT_FOUND);
    const enrollmentId = enrollment.id;
    
    await ticketsService.createTicket(ticketTypeId, enrollmentId);

    const ticket = await ticketsService.getTicketWithTypeByEnrollmentId(enrollmentId);
        
    return res.status(httpStatus.CREATED).send(ticket);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
