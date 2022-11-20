import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/tickets-repository";
import { Ticket, TicketType, TicketStatus } from "@prisma/client";

async function getTicketWithTypeByEnrollmentId(enrollmentId: number): Promise<getTicketWithTypeByUserIdResult> {
  const ticketWithEnrollmentId = await ticketRepository.findTicketTypeWithenrollmentId(enrollmentId);
  
  if (!ticketWithEnrollmentId) throw notFoundError();
  return {
    id: ticketWithEnrollmentId.id,
    status: ticketWithEnrollmentId.status, //RESERVED | PAID
    ticketTypeId: ticketWithEnrollmentId.ticketTypeId,
    enrollmentId: ticketWithEnrollmentId.enrollmentId,
    TicketType: ticketWithEnrollmentId.TicketType,
    createdAt: ticketWithEnrollmentId.createdAt,
    updatedAt: ticketWithEnrollmentId.updatedAt,
  };
}
type getTicketWithTypeByUserIdResult =   {
    id: number
    status: TicketStatus
    ticketTypeId: number
    enrollmentId: number
    TicketType: TicketType
    createdAt: Date
    updatedAt: Date
    
  };

async function getTicketByEnrollmentId() {
  const ticketWithEnrollmentId: TicketType []= await ticketRepository.findTicketWithenrollmentId();
  if (!ticketWithEnrollmentId) return;

  return ticketWithEnrollmentId;
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return  await ticketRepository.createTicket(ticketTypeId, enrollmentId);
}

const ticketsService = {
  getTicketWithTypeByEnrollmentId,
  getTicketByEnrollmentId,
  createTicket
};
  
export default ticketsService;
