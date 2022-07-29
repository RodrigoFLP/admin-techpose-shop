export interface Order {
  id: string;
  couponId: null;
  totalAmount: string;
  orderType: string;
  scheduledDate: null;
  createdAt: string;
  updatedAt: string;
  status: Status;
  ticketItems: TicketItem[];
}

export interface Status {
  id: number;
  orderPlaced: string;
  orderPaid: null;
  orderConfirmed: null;
  orderPrepared: null;
  orderReceived: null;
}

export interface TicketItem {
  id: number;
  quantity: number;
  portion: Portion;
  tags: any[];
  totalAmount: string;
  product: Product;
}

export interface Portion {
  id: number;
  name: string;
  price: number;
  tagGroups?: any[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  portions: Portion[];
  tags: any[];
  image: string;
  createdAt: string;
  updatedAt: string;
}
