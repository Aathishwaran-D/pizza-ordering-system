import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Order } from '../../model/order';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TableModule } from 'primeng/table';
import { SpinnerModule } from 'primeng/spinner';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-orderhistory',
  standalone: true,
  imports: [CommonModule,TableModule,SpinnerModule,ButtonModule],
  templateUrl: './orderhistory.component.html',
  styleUrl: './orderhistory.component.css'
})
export class OrderHistoryComponent implements OnInit {
  orders: Order[] = [];
  isLoading: boolean = true; 

  constructor(private orderService: OrderService, private router: Router) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  fetchOrders() {
    this.orderService.getUserOrders(Number(localStorage.getItem('id'))) 
      .subscribe({
        next: (orders) => {
          this.orders = orders;
          this.isLoading = false;
          console.log('Fetched Orders:', this.orders);  
        },
        error: (error) => {
          this.isLoading = false; 
          console.error('Error fetching orders:', error);
          // Handle error appropriately (e.g., display an error message)
        }
      });
  }

  viewOrderDetails(orderId: number) {
    this.router.navigate(['/orders', orderId]); 
  }
}