import { Component } from '@angular/core';
import { initializeApp } from '@firebase/app';
import { environment } from 'src/environments/environment';
import { getDatabase, ref, set, onValue } from "firebase/database";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ngChat';
  app = initializeApp(environment.firebase);
  db = getDatabase();


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

}
