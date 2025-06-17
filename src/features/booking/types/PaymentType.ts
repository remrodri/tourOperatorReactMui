export interface PaymentType {
  id?: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  bookingId: string;
  paymentProofImageURL?: string;
  // paymentProofFolder?: string;
  touristId?: string;
  sellerId: string;
}
