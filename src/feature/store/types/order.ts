export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export type PaymentMethod = 'visa' | 'mastercard' | 'cash-on-delivery' | 'bank-transfer' | 'wallet';

export type OrderProduct = {
  id: string;
  name: string;
  variant: string;
  quantity: number;
  price: number;
  image: string;
};

export type OrderCustomer = {
  name: string;
  email: string;
  phone: string;
  address: string;
  since: string;
  totalOrders: number;
};

export type OrderTimelineItem = {
  title: string;
  description: string;
  date: string;
  state: 'done' | 'current' | 'upcoming';
};

export type StoreOrder = {
  id: string;
  status: OrderStatus;
  customer: OrderCustomer;
  products: OrderProduct[];
  total: number;
  paymentMethod: PaymentMethod;
  paymentLabel: string;
  date: string;
  tracking: string;
  shippingProvider: string;
  note?: string;
  timeline: OrderTimelineItem[];
};
