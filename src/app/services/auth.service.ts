import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('token'); // or retrieve from SessionStorage/cookies
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
}
