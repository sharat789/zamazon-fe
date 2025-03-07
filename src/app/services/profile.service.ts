import { Injectable } from '@angular/core';
import { HttpCommonService } from './http-common';
import { ResponseModel } from '../../types';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private httpCommon: HttpCommonService) {}

  getUserProfile(): Observable<ResponseModel> {
    return this.httpCommon.get<ResponseModel>('/users/profile').pipe(
      catchError((error) => {
        console.error('Error fetching user profile:', error);
        return of({ message: 'Error occurred' });
      })
    );
  }

  createUserProfile(data: any): Observable<ResponseModel> {
    return this.httpCommon.post<ResponseModel>('/users/profile', data).pipe(
      catchError((error) => {
        console.error('Error creating user profile:', error);
        return of({ message: 'Error occurred' });
      })
    );
  }

  updateUserProfile(data: any): Observable<ResponseModel> {
    return this.httpCommon.patch<ResponseModel>('/users/profile', data).pipe(
      catchError((error) => {
        console.error('Error updating user profile:', error);
        return of({ message: 'Error occurred' });
      })
    );
  }
}
