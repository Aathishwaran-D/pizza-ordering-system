import { CouponDTO } from "./couponDTO";
import { OrderItemDTO } from "./orderItemDTO";
import { UserDTO } from "./userDTO";

export interface OrderDTO {
    orderDate: string;
    totalAmount: number;
    discountAmount: number;
    finalAmount: number;
    status: string;
    user: UserDTO;
    coupon?: CouponDTO | null;
    orderItems: OrderItemDTO[];
  }
  