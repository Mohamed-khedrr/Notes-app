import { not } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { NotesService } from 'src/app/services/notes.service';
declare var particlesJS: any;
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _NotesService: NotesService
  ) {}

  ngOnInit(): void {
    this._NotesService.getAllNotes().subscribe((res) => {
      if (res.message == 'success') {
        this.getUserNotes();
      } else {
        console.log('not');
      }
    });
  }
  noteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    desc: new FormControl(null),
    userID: new FormControl(this._AuthService.userData.getValue()?.['_id']),
    token: new FormControl(localStorage.getItem('userToken')),
  });

  userNotes: any = [];

  addNote(note: FormGroup) {
    // console.log(note.value);
    this._NotesService.newNote(note.value).subscribe(
      (res) => {
        if (res.message == 'success') {
          this.getUserNotes();
        } else {
          console.log('not');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getUserNotes() {
    this._NotesService.getAllNotes().subscribe(
      (res) => {
        if (res.message == 'success') {
          this.userNotes = res.Notes;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
