import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { Login } from '../store/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
  }

  loginSubmit(form: NgForm) {
    console.log(form);
    this.store.dispatch(Login({
      payload: {
        email: form.value.email,
        password: form.value.password
      }
    }))
    // this.router.navigate(['messenger'])
  }

}
