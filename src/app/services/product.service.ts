import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { HttpCommonService } from './http-common';
import { CreateProductInput, ResponseModel } from '../../types';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpCommon: HttpCommonService) {}

  fetchOrderItems(): Observable<ResponseModel> {
    return this.httpCommon
      .get<ResponseModel>(`${environment.apiUrl}/orders`)
      .pipe(
        catchError((error) => {
          console.error('Error fetching order items:', error);
          return of({ message: 'Error occurred' });
        })
      );
  }

  fetchCategories(): Observable<ResponseModel> {
    return this.httpCommon.get<ResponseModel>('/categories').pipe(
      catchError((error) => {
        console.error('Error fetching categories:', error);
        return of({ message: 'Error occurred' });
      })
    );
  }

  fetchSellerProducts(): Observable<ResponseModel> {
    return this.httpCommon.get<ResponseModel>(`seller/products`).pipe(
      catchError((error) => {
        console.error('Error fetching seller products:', error);
        return of({ message: 'Error occurred' });
      })
    );
  }

  fetchSellerOrders(): Observable<ResponseModel> {
    return this.httpCommon.get<ResponseModel>(`seller/orders`).pipe(
      catchError((error) => {
        console.error('Error fetching seller orders:', error);
        return of({ message: 'Error occurred' });
      })
    );
  }

  fetchSellerOrderById(id: number): Observable<ResponseModel> {
    return this.httpCommon.get<ResponseModel>(`seller/orders/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching seller order #${id}:`, error);
        return of({ message: 'Error occurred' });
      })
    );
  }

  fetchProducts(): Observable<ResponseModel> {
    return this.httpCommon.get<ResponseModel>('/products').pipe(
      catchError((error) => {
        console.error('Error fetching products:', error);
        return of({ message: 'Error occurred' });
      })
    );
  }

  fetchProduct(id: string): Observable<ResponseModel> {
    return this.httpCommon.get<ResponseModel>(`/products/${id}`).pipe(
      catchError((error) => {
        console.error(`Error fetching product #${id}:`, error);
        return of({ message: 'Error occurred' });
      })
    );
  }

  createProduct(input: CreateProductInput): Observable<any> {
    return this.httpCommon.post<any>('seller/products', input).pipe(
      catchError((error) => {
        console.error('Error creating product:', error);
        return of({ message: 'Error occurred' });
      })
    );
  }

  editProduct(id: number, input: CreateProductInput): Observable<any> {
    return this.httpCommon.put<any>(`seller/products/${id}`, input).pipe(
      catchError((error) => {
        console.error(`Error updating product #${id}:`, error);
        return of({ message: 'Error occurred' });
      })
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpCommon.delete<any>(`seller/products/${id}`).pipe(
      catchError((error) => {
        console.error(`Error deleting product #${id}:`, error);
        return of({ message: 'Error occurred' });
      })
    );
  }
}
