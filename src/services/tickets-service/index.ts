import { notFoundError } from "@/errors";
import ticketRepository from "@/repositories/tickets-repository";
import { Ticket, TicketType, TicketStatus } from "@prisma/client";

async function getTicketWithTypeByEnrollmentId(enrollmentId: number): Promise<getTicketWithTypeByUserIdResult> {
  const ticketWithEnrollmentId = await ticketRepository.findTicketWithenrollmentId(enrollmentId);
  if (!ticketWithEnrollmentId) throw notFoundError();
  const id = ticketWithEnrollmentId.ticketTypeId;

  const ticketTypeWithId = await ticketRepository.findTicketTypeWithenrollmentId(id);
  if (!ticketTypeWithId) throw notFoundError();
  return {
    id: ticketWithEnrollmentId.id,
    status: ticketWithEnrollmentId.status, //RESERVED | PAID
    ticketTypeId: ticketWithEnrollmentId.ticketTypeId,
    enrollmentId: ticketWithEnrollmentId.enrollmentId,
    TicketType: {
      id: ticketTypeWithId.id,
      name: ticketTypeWithId.name,
      price: ticketTypeWithId.price,
      isRemote: ticketTypeWithId.isRemote,
      includesHotel: ticketTypeWithId.includesHotel,
      createdAt: ticketTypeWithId.createdAt,
      updatedAt: ticketTypeWithId.updatedAt,
    },
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

async function getTicketByEnrollmentId(enrollmentId: number) {
  const ticketWithEnrollmentId: Ticket = await ticketRepository.findTicketWithenrollmentId(enrollmentId);
  if (!ticketWithEnrollmentId) throw notFoundError();

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
