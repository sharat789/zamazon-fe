import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000';
  constructor(private httpClient: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.httpClient.post(`${this.apiUrl}/users/login`, credentials);
  }

  register(credentials: { email: string; password: string; phone: string }) {
    return this.httpClient.post(`${this.apiUrl}/users/register`, credentials);
  }
}
