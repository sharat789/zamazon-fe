import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpCommonService {
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = sessionStorage.getItem('token') as string;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
  }

  get<T>(url: string): Observable<T> {
    return this.http.get<T>(`${environment.apiUrl}${url}`, {
      headers: this.getHeaders(),
    });
  }

  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(`${environment.apiUrl}${url}`, body, {
      headers: this.getHeaders(),
    });
  }

  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(`${environment.apiUrl}${url}`, body, {
      headers: this.getHeaders(),
    });
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(`${environment.apiUrl}${url}`, {
      headers: this.getHeaders(),
    });
  }

  patch<T>(url: string, body: any): Observable<T> {
    return this.http.patch<T>(`${environment.apiUrl}${url}`, body, {
      headers: this.getHeaders(),
    });
  }
}
