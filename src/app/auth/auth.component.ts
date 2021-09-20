import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducer';
import { AuthSuccess, Login, SignupStart } from './store/auth.actions';
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  auth = getAuth();

  hackyWayOfValidation = false;
  signupMode = false;

  ngOnInit(): void {


    // look at this shit later, need auto login and maybe auto logout
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {

        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        console.log(user)

        this.store.dispatch(AuthSuccess({
          payload: {
            email: user.email,
            uid: user.uid,
            username: 'need something',
            tokenExpDate: new Date(),
            token: '',
            messages: []
          }
        }))
        // ...
      } else {

        // User is signed out
        // ...

        console.log('WE ARE IN THE ELSE BLOCK')
      }
    });
  }

  signupSubmit(form: NgForm) {
    console.log(form);
    if (form.value.password !== form.value.rePassword) {
      this.hackyWayOfValidation = true;
      console.log('mismatch')
    }

    this.store.dispatch(SignupStart({
      payload: {
        email: form.value.email,
        password: form.value.password,
        username: form.value.username
      }
    }))

    this.store.select('auth').subscribe(
      (res) => {
        console.log(res);
      }
    )

    this.router.navigate(['messenger'])
  }

  loginSubmit(form: NgForm) {
    console.log(form);
    this.store.dispatch(Login({
      payload: {
        email: form.value.email,
        password: form.value.password
      }
    }))
    this.router.navigate(['messenger'])
  }

}
