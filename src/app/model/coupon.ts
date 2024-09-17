export interface Coupon {
    id: number;         // Optional because it might be auto-generated
    code: string;        // Coupon code
    discount: number;    // Discount percentage or amount
    expiryDate: Date;    // Expiry date of the coupon
  }
  