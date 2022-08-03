import { Status } from "../../interfaces/ticket";

export const getStatus = (status: Status): string => {
  if (status.orderReceived) {
    return "Finalizada";
  }
  if (status.orderPrepared) {
    return "En camino";
  }
  if (status.orderConfirmed) {
    return "Preparando";
  }
  if (status.orderPaid) {
    return "Pagada";
  }
  return "Sin pagar";
};
