import { Injectable } from '@angular/core';
import { HttpCommonService } from './http-common';
import { Observable, catchError, of } from 'rxjs';
import { ResponseModel } from '../../types';

interface CheckoutResponse {
  checkout_url: string;
  message: string;
  session_id: string;
}

interface VerifyPaymentResponse {
  message: string;
  order_id: string; // Ensure this matches the response from your backend
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpCommon: HttpCommonService) {}

  createCheckoutSession(): Observable<CheckoutResponse> {
    return this.httpCommon.get<CheckoutResponse>('/buyer/checkout').pipe(
      catchError((error) => {
        console.error('Error creating checkout session:', error);
        return of({
          checkout_url: '',
          message: 'Failed to create checkout session',
          session_id: '',
        });
      })
    );
  }

  verifyPayment(sessionId: string): Observable<VerifyPaymentResponse> {
    return this.httpCommon
      .get<VerifyPaymentResponse>(`/buyer/verify?session_id=${sessionId}`)
      .pipe(
        catchError((error) => {
          console.error('Error verifying payment:', error);
          return of({
            message: 'Failed to verify payment',
            order_id: '',
          });
        })
      );
  }

  getOrders(): Observable<ResponseModel> {
    return this.httpCommon.get<ResponseModel>('/users/order').pipe(
      catchError((error) => {
        console.error('Error fetching orders:', error);
        return of({
          message: 'Failed to fetch orders',
          data: [],
        });
      })
    );
  }
}
