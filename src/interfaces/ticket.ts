export interface Ticket {
  id: string;
  couponId: string | null;
  totalAmount: string;
  orderType: string;
  scheduledDate: string | null;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  status: Status;
}

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  birthDate: string;
  createdAt: string;
  updatedAt: string;
  lastLogin: string | null;
  receiveAds: boolean;
}

export interface Status {
  id: number;
  orderPlaced: string | null;
  orderPaid: string | null;
  orderConfirmed: string | null;
  orderPrepared: string | null;
  orderReceived: string | null;
}
