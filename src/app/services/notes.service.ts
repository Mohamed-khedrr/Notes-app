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
  // token: string = <string>localStorage.getItem('userToken');
  userId: string = this._AuthService.userData.getValue()?.['_id'];

  newNote(obj: object): Observable<any> {
    return this._HttpClient.post(`${this.baseUrl}addNote`, obj);
  }

  getAllNotes(token: string): Observable<any> {
    let obj = {
      Token: token,
      userID: this.userId,
    };
    return this._HttpClient.get(`${this.baseUrl}getUserNotes`, {
      headers: obj,
    });
  }

  deleteNote(noteId: string, token: string): Observable<any> {
    let obj = {
      NoteID: noteId,
      token: token,
    };
    return this._HttpClient.delete(`${this.baseUrl}deleteNote`, {
      body: obj,
    });
  }

  updateNote(obj: object): Observable<any> {
    return this._HttpClient.put(`${this.baseUrl}updateNote`, obj);
  }
}
