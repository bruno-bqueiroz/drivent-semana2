import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";

async function findTicketWithenrollmentId() {
  return prisma.ticketType.findMany();
}

async function findTicketTypeWithenrollmentId(enrollmentId: number) {
  return prisma.ticket.findFirst({
    where: { enrollmentId },
    include: {
      TicketType: true,
    },
  });
}

async function findTicketWithTicketId(ticketId: number) {
  const id = ticketId;
  return prisma.ticket.findFirst({
    where: { id }
  });
}

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: TicketStatus.RESERVED,
    },
  });
}

async function setStatusTicket(ticketId: number) {
  const id = ticketId;
  return prisma.ticket.update({
    where: { id },
    data: {
      status: TicketStatus.PAID,
    }
  });
}

const ticketRepository = {
  findTicketWithenrollmentId,
  findTicketTypeWithenrollmentId,
  findTicketWithTicketId,
  createTicket,
  setStatusTicket
};
  
export default ticketRepository;
