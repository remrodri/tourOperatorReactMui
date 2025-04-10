export interface PaymentInfoType {
  id?: string;
  amount: number;
  paymentDate: string;
  paymentMethod: string;
  transactionId?: string;
}
