import { Customer } from "./customer";
import { Portion } from "./product";
import { Address } from "./profile";

export enum StatusType {
  PLACED = "OrderPlaced",
  PAID = "OrderPaid",
  CONFIRMED = "OrderConfirmed",
  PREPARED = "OrderPrepared",
  DELIVERED = "OrderReceived",
}

export interface Order {
  id: string;
  couponId: null;
  totalAmount: string;
  orderType: string;
  scheduledDate: null;
  createdAt: string;
  updatedAt: string;
  customer: Customer;
  status: Status;
  ticketItems: TicketItem[];
}

export interface ActiveOrder {
  id: string;
  couponId: string | null;
  totalAmount: string;
  orderType: string;
  scheduledDate: string | null;
  createdAt: string;
  updatedAt: string;
  ticketItems: TicketItem[];
  customer: Customer;
  address: Address;
  status: Status;
}

export interface Status {
  id: number;
  orderPlaced: string;
  orderPaid: string | null;
  orderConfirmed: string | null;
  orderPrepared: string | null;
  orderReceived: string | null;
}

export interface TicketItem {
  id: number;
  quantity: number;
  portion: TicketItemPortion;
  tags: any[];
  totalAmount: string;
  product: Product;
}

export interface TicketItemPortion {
  id: number;
  name: string;
  price: number;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  portions: PortionElement[];
  portionsTagGroups: any[];
  tags: any[];
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface PortionElement {
  id: string;
  name: string;
  price: number;
  tagGroups: any[];
}
