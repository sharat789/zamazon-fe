import { Injectable } from '@angular/core';
import { HttpCommonService } from './http-common';
import { Observable, catchError, of } from 'rxjs';
import { ResponseModel } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private httpCommon: HttpCommonService) {}

  fetchCartItems(): Observable<ResponseModel> {
    return this.httpCommon.get<ResponseModel>('/users/cart').pipe(
      catchError((error) => {
        console.error('Error fetching cart items:', error);
        return of({ message: 'Error occurred' });
      })
    );
  }

  addToCart(product_id: number, qty: number): Observable<ResponseModel> {
    return this.httpCommon
      .post<ResponseModel>('/users/cart', {
        qty,
        product_id,
      })
      .pipe(
        catchError((error) => {
          console.error('Error adding to cart:', error);
          return of({ message: 'Error occurred' });
        })
      );
  }

  updateCartItem(productId: number, qty: number): Observable<ResponseModel> {
    return this.httpCommon
      .put<ResponseModel>(`/users/cart/${productId}`, { qty })
      .pipe(
        catchError((error) => {
          console.error('Error updating cart item:', error);
          return of({ message: 'Error occurred' });
        })
      );
  }

  removeCartItem(productId: number): Observable<ResponseModel> {
    return this.httpCommon
      .delete<ResponseModel>(`/users/cart/${productId}`)
      .pipe(
        catchError((error) => {
          console.error('Error removing cart item:', error);
          return of({ message: 'Error occurred' });
        })
      );
  }

  clearCart(): Observable<ResponseModel> {
    return this.httpCommon.delete<ResponseModel>('/users/cart').pipe(
      catchError((error) => {
        console.error('Error clearing cart:', error);
        return of({ message: 'Error occurred' });
      })
    );
  }
}
