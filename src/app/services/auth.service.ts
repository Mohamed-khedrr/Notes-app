import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private _HttpClient: HttpClient) {}

  baseUrl: string = 'https://route-egypt-api.herokuapp.com/';

  userData = new BehaviorSubject<any>(null);

  registerNewUser(obj: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}signup`, obj);
  }

  logIn(obj: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}signin`, obj);
  }

  // decode token to get user data
  setUserData(token: string) {
    localStorage.setItem('userToken', token);
    this.userData.next(jwtDecode(token));
  }

  logOut() {
    this.userData.next(null);
    localStorage.removeItem('userToken');
  }
}
