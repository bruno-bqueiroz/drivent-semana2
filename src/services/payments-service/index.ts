import { Payment } from "@prisma/client";
import { unauthorizedError, notFoundError } from "@/errors";
import paymentRepository from "@/repositories/payments-repository";
import ticketRepository from "@/repositories/tickets-repository";
import enrollmentRepository from "@/repositories/enrollment-repository";

async function getPaymentWithTicketId(ticketId: number, userId: number) {
  const ticket = await ticketRepository.findTicketWithTicketId(ticketId);
  if (!ticket) throw notFoundError();
  const paymentData = await paymentRepository.getpayment(ticketId);
  const enrollmentId = ticket.enrollmentId;
  const isValid = await enrollmentRepository.getEnrollmentById(enrollmentId);
  if(isValid.userId === userId) return paymentData;
  else throw unauthorizedError();
}

async function getTicketWithId(ticketId: number) {
  const ticket = await ticketRepository.findTicketWithTicketId(ticketId);
  if (!ticket) return;
  const enrollmentId = ticket.enrollmentId;
  const price = await ticketRepository.findTicketTypeWithenrollmentId(enrollmentId);
  return price.TicketType.price;
}

async function postPayment(ticketId: number, value: number, cardIssuer: string, cardLastDigits: string) {
  const dataPayment = await paymentRepository.postPaymentWithObj(ticketId, value, cardIssuer, cardLastDigits);
  await ticketRepository.setStatusTicket(ticketId);
  return dataPayment;
}

type PaymentType =Omit<Payment, "id">;

const paymentService = {
  getPaymentWithTicketId,
  getTicketWithId,
  postPayment
};
    
export default paymentService;
