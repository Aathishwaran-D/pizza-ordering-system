import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDTO } from '../model/orderDTO';
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  getOrdersByUsername(username: string) {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:8082/pizza/orders'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Method to place an order by sending OrderDTO to backend
  placeOrder(order: OrderDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }
}
