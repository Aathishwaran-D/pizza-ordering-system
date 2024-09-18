import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { ActivatedRoute } from '@angular/router';
import { Pizza } from '../../model/pizza';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Coupon } from '../../model/coupon';
import { CouponService } from '../../services/coupon.service';
import { error } from 'console';
import { OrderDTO } from '../../model/orderDTO';
import { OrderService } from '../../services/order.service';
// import { ViewChild } from '@angular/core';
// import { OrderConfirmationComponent } from '../order-confirmation/order-confirmation.component';

interface SelectedPizza {
  pizza: Pizza;
  quantity: number;
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CardModule, CommonModule,TableModule,MenubarModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/home']
    },
    {
      label: 'Cart',
      icon: 'pi pi-fw pi-shopping-cart',
      routerLink: ['/cart']
    },
    {
      label:  sessionStorage.getItem('userName') || 'Guest',
      icon: 'pi pi-fw pi-user',
      routerLink: ['/login']
    }
  ]
  
  selectedPizzas: SelectedPizza[] = [];
  totalPrice = 0;
  message = ''; 
  coupon: Coupon | null = null;
  availableCoupons: Coupon[] = [];
  couponApplied = false; // Flag to track if a coupon has been applied  
  

  // Coupon for displaying the available cooupons 

  constructor(private route: ActivatedRoute, private couponService: CouponService, private orderService: OrderService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['selectedPizzas']) {
        this.selectedPizzas = JSON.parse(params['selectedPizzas']) as SelectedPizza[];
      }
      if (params['totalPrice']) {
        this.totalPrice = Number(params['totalPrice']);
      }
      
    });
    this.loadCoupons();
    
  }
  loadCoupons() {
    this.couponService.getCoupon().subscribe(
      (data) => (this.availableCoupons = data),
      (error) => console.log('Error fetching coupons', error)
    );
  }

//  To clear the cart 
clearCart() {
  this.selectedPizzas = [];  // Clear the selected pizzas array
  this.totalPrice = 0;       // Reset the total price
  this.message=''
  this.coupon = null;
  this.couponApplied = false;
}
orderPizzas() {
  if (this.selectedPizzas.length > 0) {
    this.message = 'Your order is placed!';  // Set confirmation message
        // Prepare order items
        const orderItems = this.selectedPizzas.map(pizza => ({
          quantity: pizza.quantity,
          price: pizza.pizza.price,
          pizza: { id: pizza.pizza.id }
        }));

         // Prepare the order payload
         const userId = localStorage.getItem('id');
    const orderDetails: OrderDTO = {
      orderDate: new Date().toISOString(), // Current date
      totalAmount: this.totalPrice, // Total price from cart
      discountAmount: this.coupon ? (this.totalPrice * (this.coupon.discount / 100)) : 0, // Calculate discount
      finalAmount: this.totalPrice - (this.coupon ? (this.totalPrice * (this.coupon.discount / 100)) : 0), // Final amount after discount
      status: 'COMPLETED',
      user: { id: Number(userId) }, // Hardcoded user ID for now, change as needed
      coupon: this.coupon && this.coupon.id ? { id: this.coupon.id } : undefined, // Ensure `id` is defined or use `undefined` // Use coupon ID if applied
      orderItems: orderItems // Pizza items
    };
        // Send the order to the backend
    this.orderService.placeOrder(orderDetails).subscribe(
      (response: any) => {
            console.log('Order placed successfully', response);
            this.message = 'Order placed successfully!';
          },
          (error) => {
            console.error('Error placing order', error);
            this.message = 'Error placing order. Please try again.';
          }
        );


  } else {
    this.message = 'Please select at least one pizza to order.';  // Error message
  }
}

selectCoupon(chosenCoupon: Coupon) {
  if (!this.couponApplied) {
    this.coupon = chosenCoupon;
    this.applyCouponDiscount();
    this.couponApplied = true;
  }
}

applyCouponDiscount() {
  if (this.coupon) {
    const discount = this.coupon.discount / 100;
    this.totalPrice = this.totalPrice * (1 - discount);
  }
}

}

