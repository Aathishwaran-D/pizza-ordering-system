import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrderDTO } from '../model/orderDTO';
import { Order } from '../model/order';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:8082/pizza/orders'; // Backend API URL

  constructor(private http: HttpClient) {}

  // Method to place an order by sending OrderDTO to backend
  placeOrder(order: OrderDTO): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }

  getUserOrders(id: Number): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiUrl}/user/${id}`);
  }
  // getUserOrders(): Observable<Order[]> {
  //   return this.http.get<Order[]>(${this.apiUrl}/user, { headers: this.getAuthHeaders() })
  //     .pipe(
  //       catchError(error => {
  //         // Handle errors 
  //         console.error('Error fetching user orders:', error);
  //         return throwError(() => error);
  //       })
  //     );
  // }
}
