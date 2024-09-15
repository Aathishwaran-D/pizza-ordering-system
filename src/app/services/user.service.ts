import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8082/auth';  // Base URL for the Spring Boot backend

  constructor(private http: HttpClient) { }

  // Different name in Angular (getWelcomeMessage) but it still calls /auth/welcome in Spring Boot
  getWelcomeMessage(): Observable<string> {
    return this.http.get(`${this.baseUrl}/welcome`, { responseType: 'text' });
  }

  register(user: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addNewUser`, user);
  }

  login(credentials: any) {
    return this.http.post(`${this.baseUrl}/login`, credentials);
  }
}
