import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
declare var particlesJS: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
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

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, [Validators.required]),
  });

  signIn(data: FormGroup) {
    this._AuthService.logIn(data.value).subscribe(
      (res) => {
        if (res.message == 'success') {
          this._AuthService.setUserData(res.token);
          this._Router.navigate(['/notes']);
        } else {
          $('#email-wrong').removeClass('d-none');
        }
      },
      (err) => {}
    );
  }
}
