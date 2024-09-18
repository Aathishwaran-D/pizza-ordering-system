import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pizza } from '../model/pizza';
import { AuthService } from './auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private apiUrl = 'http://localhost:8082/auth/pizza';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getPizzas(): Observable<Pizza[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get<Pizza[]>(`${this.apiUrl}/view`, { headers });
  }

  getPizzaById(id: number): Observable<Pizza> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.get<Pizza>(`${this.apiUrl}/${id}`, { headers });
  }
  
  createPizza(pizza: Pizza): Observable<Pizza> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.post<Pizza>(`${this.apiUrl}/add`, pizza, { headers });
  }
  
  updatePizza(id: number, pizza: Pizza): Observable<Pizza> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.put<Pizza>(`${this.apiUrl}/update/${id}`, pizza, { headers });
  }
  
  deletePizza(id: number): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.authService.getToken()}`);
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`, { headers });
  }

}
