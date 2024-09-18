import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('jwtToken'); // or retrieve from SessionStorage/cookies
  }

  protected getHeaders(): HttpHeaders {
    return new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });
  }

  public getData(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get('protected-route', { headers });
  }
  getToken(): string | null {
    return localStorage.getItem('jwtToken'); // Or however you store the token
  }
}
