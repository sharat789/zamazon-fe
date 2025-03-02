import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpCommonService } from './http-common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpService = inject(HttpCommonService);
  constructor(private httpClient: HttpClient) {}

  login(credentials: { email: string; password: string }) {
    return this.httpService.post('/users/login', credentials);
  }

  register(credentials: { email: string; password: string; phone: string }) {
    return this.httpService.post('/users/register', credentials);
  }
}
