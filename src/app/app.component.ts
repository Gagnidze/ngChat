import { Component, OnInit } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { environment } from 'src/environments/environment';
import { getDatabase, ref, set, onValue } from "firebase/database";
import { getAuth, getIdToken, onAuthStateChanged } from 'firebase/auth';
import { AuthSuccess } from './auth/store/auth.actions';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.reducer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ngChat';
  app = initializeApp(environment.firebase);
  db = getDatabase();

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }


  writeUserData() {
    set(ref(this.db, 'users/'), {
      username: 'name',
      email: 'email',
      profile_picture: 'imageUrl'
    });
  }

  // const db = getDatabase();
  starCountRef = ref(this.db);
  funkyFuncTest() {


    onValue(this.starCountRef, (snapshot: any) => {
      const data = snapshot.val();
      // updateStarCount(postElement, data);
      console.log(data);
    })
  }
  ngOnInit() {


    // look at this shit later, need auto login and maybe auto logout
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {

        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        getIdToken(user)
        console.log('IF BLOCK')
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

        console.log('ELSE BLOCK')
        // User is signed out
        // ...

        this.router.navigate['auth'];
      }
    });

  }
}
