import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  constructor(private _AuthService: AuthService) {}

  logedIn: boolean = false;

  ngOnInit(): void {
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() == null) {
        this.logedIn = false;
      } else {
        this.logedIn = true;
      }
    });
  }

  logOut() {
    this._AuthService.logOut();
  }
}
