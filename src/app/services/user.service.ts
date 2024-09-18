import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderDTO } from '../model/orderDTO';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8082/';  // Base URL for the Spring Boot backend

  constructor(private http: HttpClient) { }

  // Different name in Angular (getWelcomeMessage) but it still calls /auth/welcome in Spring Boot
  getWelcomeMessage(): Observable<string> {
    return this.http.get(`${this.baseUrl}auth/welcome`, { responseType: 'text' });
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}auth/addNewUser`, user);
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}auth/login`, credentials).pipe(
      map((response: any) => {
        if (response && response.token) {
          // Store the token in localStorage (or sessionStorage as per your preference)
          localStorage.setItem('jwtToken', response.token);
          localStorage.setItem('roles', response.roles);
        }
        return response;
      })
    );
  }
  getOrdersByUsername(username: string): Observable<OrderDTO[]> {
    return this.http.get<OrderDTO[]>(`${this.baseUrl}pizza/orders/user/${username}`);
  }
    // New methods added from UserController
    getUserProfile(): Observable<string> {
      return this.http.get(`${this.baseUrl}user/userProfile`, { responseType: 'text' });
    }
  
    getAdminProfile(): Observable<string> {
      return this.http.get(`${this.baseUrl}auth/admin/adminProfile`, { responseType: 'text' });
    }
  

  // Method to get the token
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Method to logout (clear the token)
  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  getUserRole(): Observable<string> {
    const roles = localStorage.getItem('roles');
    return of(roles ? roles : '');
  }
}
