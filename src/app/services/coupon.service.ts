import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Coupon } from '../model/coupon';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  private apiUrl = 'http://localhost:8082/pizza/coupons';

  constructor(private http: HttpClient) { }

  getCoupon(): Observable<Coupon[]> {
    return this.http.get<Coupon[]>(this.apiUrl);
  }
}
