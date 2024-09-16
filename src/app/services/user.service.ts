import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
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
    return this.http.post(`${this.baseUrl}/login`, credentials).pipe(
      map((response: any) => {
        if (response && response.token) {
          // Store the token in localStorage (or sessionStorage as per your preference)
          localStorage.setItem('jwtToken', response.token);
        }
        return response;
      })
    );
  }

    // New methods added from UserController
    getUserProfile(): Observable<string> {
      return this.http.get(`${this.baseUrl}/user/userProfile`, { responseType: 'text' });
    }
  
    getAdminProfile(): Observable<string> {
      return this.http.get(`${this.baseUrl}/admin/adminProfile`, { responseType: 'text' });
    }
  

  // Method to get the token
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Method to logout (clear the token)
  logout(): void {
    localStorage.removeItem('jwtToken');
  }
}
