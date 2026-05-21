import { Tour, Business, Order, Customer, Voucher } from './types';

export const mockBusinesses: Business[] = [
  { id: 'sup-1', name: 'Viet Travel Co.', type: 'SUPPLIER', contactEmail: 'contact@viettravel.com', sqlConfig: 'Server=viettravel;Database=Tours;' },
  { id: 'sup-2', name: 'Saigon Tours', type: 'SUPPLIER', contactEmail: 'info@saigontours.vn' },
  { id: 'sel-1', name: 'Elite Agents', type: 'SELLER', contactEmail: 'sales@eliteagents.com', commissionRate: 0.1 },
  { id: 'sel-2', name: 'Backpackers Hub', type: 'SELLER', contactEmail: 'hello@backpackers.com', commissionRate: 0.15 },
];

export const mockTours: Tour[] = [
  {
    id: 'tour-1',
    supplierId: 'sup-1',
    title: 'Ha Long Bay 2D1N Luxury Cruise',
    description: 'Experience the magic of Ha Long Bay on a 5-star cruise.',
    itinerary: [
      { day: 1, content: 'Pick up from Hanoi, check in cruise, lunch, visit Sung Sot cave.' },
      { day: 2, content: 'Tai Chi session, visit Titop island, brunch, return to Hanoi.' }
    ],
    price: { adult: 150, child: 100 },
    transport: 'Luxury Shuttle Bus',
    pickupPoint: 'Hanoi Old Quarter',
    dropoffPoint: 'Hanoi Old Quarter',
    startDate: '2026-04-10',
    slotsRemaining: 15,
    images: ['https://picsum.photos/seed/halong/800/600'],
    isInMarketplace: true,
    commissionRate: 0.12,
    tags: ['Luxury', 'Cruise', 'Nature']
  },
  {
    id: 'tour-2',
    supplierId: 'sup-2',
    title: 'Mekong Delta Day Trip',
    description: 'Explore the floating markets and lush orchards of the Mekong.',
    itinerary: [
      { day: 1, content: 'Boat trip to floating market, visit coconut candy workshop, lunch at local orchard.' }
    ],
    price: { adult: 45, child: 30 },
    transport: 'AC Minivan',
    pickupPoint: 'District 1, HCMC',
    dropoffPoint: 'District 1, HCMC',
    startDate: '2026-03-25',
    slotsRemaining: 20,
    images: ['https://picsum.photos/seed/mekong/800/600'],
    isInMarketplace: true,
    commissionRate: 0.1,
    tags: ['Culture', 'Day Trip']
  }
];

export const mockCustomers: Customer[] = [
  { id: 'cust-1', name: 'John Doe', email: 'john@example.com', phone: '+84901234567', totalBookings: 2, totalSpent: 300, lastBookingDate: '2026-02-15' },
  { id: 'cust-2', name: 'Jane Smith', email: 'jane@example.com', phone: '+84907654321', totalBookings: 1, totalSpent: 45, lastBookingDate: '2026-03-01' }
];

export const mockOrders: Order[] = [
  {
    id: 'ord-1',
    tourId: 'tour-1',
    sellerId: 'sel-1',
    customerId: 'cust-1',
    customerName: 'John Doe',
    customerEmail: 'john@example.com',
    customerPhone: '+84901234567',
    bookingDate: '2026-02-10',
    status: 'COMPLETED',
    paymentStatus: 'PAID',
    totalAmount: 300,
    commissionAmount: 36,
    pax: { adults: 2, children: 0 }
  },
  {
    id: 'ord-2',
    tourId: 'tour-2',
    sellerId: null,
    customerId: 'cust-2',
    customerName: 'Jane Smith',
    customerEmail: 'jane@example.com',
    customerPhone: '+84907654321',
    bookingDate: '2026-03-01',
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    totalAmount: 45,
    commissionAmount: 0,
    pax: { adults: 1, children: 0 }
  }
];

export const mockVouchers: Voucher[] = [
  { id: 'vouch-1', partnerId: 'sel-1', type: 'PAYMENT', amount: 36, status: 'CONFIRMED', date: '2026-02-28', description: 'Commission for ord-1' }
];
