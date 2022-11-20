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

async function createTicket(enrollmentId: number, ticketTypeId: number) {
  return prisma.ticket.create({
    data: {
      enrollmentId,
      ticketTypeId,
      status: TicketStatus.RESERVED,
    },
  });
}

const ticketRepository = {
  findTicketWithenrollmentId,
  findTicketTypeWithenrollmentId,
  createTicket
};
  
export default ticketRepository;
