import { prisma } from "@/config";

async function getpayment(ticketId: number) {
  return prisma.payment.findFirst({
    where: { ticketId },
  });
}

async function postPaymentWithObj(ticketId: number, value: number, cardIssuer: string, cardLastDigits: string) {
  return prisma.payment.create({
    data: { ticketId, value, cardIssuer, cardLastDigits }
  });
}

const paymentRepository = {
  getpayment,
  postPaymentWithObj
};
    
export default paymentRepository;
