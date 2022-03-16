import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  constructor(
    private _HttpClient: HttpClient,
    private _AuthService: AuthService
  ) {}
  baseUrl: string = 'https://route-egypt-api.herokuapp.com/';

  newNote(obj: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}addNote`, obj);
  }

  getAllNotes(): Observable<any> {
    let token: string = <string>localStorage.getItem('userToken');
    let userId: string = this._AuthService.userData.getValue()?.['_id'];

    let obj = {
      Token: token,
      userID: userId,
    };
    return this._HttpClient.get(`${this.baseUrl}getUserNotes`, {
      headers: obj,
    });
  }
}
