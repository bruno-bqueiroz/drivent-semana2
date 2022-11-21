import { AuthenticatedRequest } from "@/middlewares";
import httpStatus from "http-status";
import { Response } from "express";
import paymentService from "@/services/payments-service";

export async function getpayments(req: AuthenticatedRequest, res: Response) {
  const userId  = req.userId;
  const ticketId = Number(req.query.ticketId);

  if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST);
  try {
    const paymentTicket = await paymentService.getPaymentWithTicketId(ticketId, userId);
    return res.send(paymentTicket).status(200);
  } catch (error) {
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    else if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function processPayments(req: AuthenticatedRequest, res: Response) {
  const { ticketId } = req.body;
  if (!ticketId)return res.sendStatus(httpStatus.BAD_REQUEST);
  const { cardData } = req.body;
  if (!cardData)return res.sendStatus(httpStatus.BAD_REQUEST);
  const { issuer, number } = req.body.cardData;
  const userId  = req.userId;

  try {
    const haveTicket = await paymentService.getPaymentWithTicketId(ticketId, userId);

    const priceByEnrollmentId = await paymentService.getTicketWithId(ticketId);
    const paymentObj = {
      ticketId: ticketId,
      value: priceByEnrollmentId,
      cardIssuer: issuer, // VISA | MASTERCARD
      cardLastDigits: number.substr(number.length -4, number.length -1)
    };

    const dataPayment = await paymentService.postPayment(paymentObj.ticketId, paymentObj.value, paymentObj.cardIssuer, paymentObj.cardLastDigits);
    return res.status(200).send(dataPayment);
  } catch (error) {
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    else if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    } else res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
