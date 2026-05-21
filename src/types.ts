export type Role = 'ADMIN' | 'SUPPLIER' | 'SELLER' | 'PUBLIC';

export interface Business {
  id: string;
  name: string;
  type: 'SUPPLIER' | 'SELLER';
  contactEmail: string;
  commissionRate?: number; // Default for partner
  sqlConfig?: string; // For suppliers
}

export interface Tour {
  id: string;
  supplierId: string;
  title: string;
  description: string;
  itinerary: { day: number; content: string }[];
  price: {
    adult: number;
    child: number;
  };
  transport: string;
  pickupPoint: string;
  dropoffPoint: string;
  startDate: string;
  slotsRemaining: number;
  images: string[];
  isInMarketplace: boolean;
  commissionRate?: number; // Specific tour commission
  tags: string[];
}

export interface Order {
  id: string;
  tourId: string;
  sellerId: string | null; // null if direct via Web
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  bookingDate: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  paymentStatus: 'UNPAID' | 'PAID' | 'REFUNDED';
  totalAmount: number;
  commissionAmount: number;
  pax: {
    adults: number;
    children: number;
  };
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalBookings: number;
  totalSpent: number;
  lastBookingDate: string;
}

export interface Voucher {
  id: string;
  partnerId: string;
  type: 'RECEIPT' | 'PAYMENT'; // Receipt from customer, Payment to partner
  amount: number;
  status: 'DRAFT' | 'CONFIRMED';
  date: string;
  description: string;
}

export interface SellerSiteConfig {
  sellerId: string;
  brandName: string;
  logo: string;
  primaryColor: string;
  domain: string;
}
