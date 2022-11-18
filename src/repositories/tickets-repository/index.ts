import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function findTicketWithenrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
  });
}

async function findTicketTypeWithenrollmentId(id: number) {
  return prisma.ticketType.findFirst({
    where: { id },
  });
}

async function createTicket(enrollmentId: number, ticketTypeId: number, status: TicketStatus) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status,
    },
  });
}

const ticketRepository = {
  findTicketWithenrollmentId,
  findTicketTypeWithenrollmentId,
  createTicket
};
  
export default ticketRepository;
