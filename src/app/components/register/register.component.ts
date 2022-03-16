import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import * as $ from 'jquery';
import { Router } from '@angular/router';
declare var particlesJS: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  ngOnInit(): void {
    particlesJS.load(
      'particles-js',
      'assets/json/particlesjs-config.json',
      function () {
        console.log('callback - particles.js config loaded');
      }
    );

    if (
      localStorage.getItem('userToken') != null &&
      localStorage.getItem('userToken') != ''
    ) {
      this._AuthService.setUserData(<string>localStorage.getItem('userToken'));
      this._Router.navigate(['/notes']);
    }
  }

  registerForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
    age: new FormControl(null, [Validators.required]),
  });

  signUp(userData: FormGroup) {
    this._AuthService.registerNewUser(userData.value).subscribe(
      (res) => {
        if (res.message == 'success') {
          this._Router.navigate(['/login']);
        } else {
          $('#email-exists').removeClass('d-none');
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
