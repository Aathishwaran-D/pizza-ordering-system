import { Component } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { OrderItemDTO } from '../../model/orderItemDTO';
import { OrderDTO } from '../../model/orderDTO';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {
  orderItems: OrderItemDTO[] = [];
  orderDetails: OrderDTO;

  constructor(private orderService: OrderService) {
    // Example data for the order
    this.orderDetails = {
      orderDate: new Date().toISOString(),
      totalAmount: 1000,
      discountAmount: 100,
      finalAmount: 900,
      userId: 1, // Set the user ID dynamically in real scenario
      couponId: 1, // Optional
      orderItems: []
    };

    // Add some pizzas to the order
    this.orderItems.push({
      quantity: 2,
      price: 500,
      pizzaId: 1
    });
    
    this.orderDetails.orderItems = this.orderItems;
  }

  placeOrder() {
    this.orderService.placeOrder(this.orderDetails).subscribe(
      response => {
        console.log('Order placed successfully', response);
      },
      error => {
        console.error('Error placing order', error);
      }
    );
  }
}
