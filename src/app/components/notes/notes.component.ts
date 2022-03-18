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

  token: string = <string>localStorage.getItem('userToken');

  ngOnInit(): void {
    this._NotesService.getAllNotes(this.token).subscribe((res) => {
      if (res.message == 'success') {
        this.getUserNotes();
      } else {
        console.log('not');
      }
    });
  }
  userNotes: any = [];

  noteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    desc: new FormControl(null),
    userID: new FormControl(this._AuthService.userData.getValue()?.['_id']),
    token: new FormControl(localStorage.getItem('userToken')),
  });

  editForm: FormGroup = new FormGroup({
    title: new FormControl(null),
    desc: new FormControl(null),
    NoteID: new FormControl(null),
    token: new FormControl(null),
  });

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
    this._NotesService.getAllNotes(this.token).subscribe(
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

  deleteNote(noteId: string) {
    this._NotesService.deleteNote(noteId, this.token).subscribe(
      (res) => {
        if (res.message == 'deleted') {
          this.getUserNotes();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  editNote(title: string, desc: string, noteId: string) {
    this.editForm.reset({
      title: title,
      desc: desc,
      NoteID: noteId,
      token: localStorage.getItem('userToken'),
    });
    $('#title-update').val(title);
    $('#desc-update').val(desc);
  }

  updateNote(data: FormGroup) {
    this._NotesService.updateNote(data.value).subscribe(
      (res) => {
        if (res.message == 'updated') {
          this.getUserNotes();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
