import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';
import { Subscription } from 'rxjs';
import { Message } from '../shared/message.model';
import { AppState } from '../store/app.reducer';
import { selectUser, SendMsg, StoreAllMessages, StoreMessages } from './store/data.actions';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  db = getDatabase();
  dbRef = ref(this.db);
  users;

  auth = getAuth();

  guja;

  messages;

  msg;

  allMsg;

  selectedUser: string;

  activeUser: string;

  authSub: Subscription;

  userMessages = [];


  ngOnInit(): void {
    // Getting the user who logged in from STORE and storing it here (for template and future use)
    this.store.select('auth').subscribe(
      (res) => {
        console.log('getting active user UID oninit from store')
        this.activeUser = res.uid;
      }
    )

    // Getting the list of users from DATABASE to make chat options
    onValue(this.dbRef, (snapshot: any) => {

      this.users = snapshot.val().users;

      // This property stores only the messages for active user

      this.userMessages = Object.entries(this.users[this.activeUser].messages);

      delete this.users[this.activeUser]

      this.users = Object.entries(this.users)

      // Getting last messages for message previews

      this.userMessages.forEach((singleUserMessages, i) => {

        this.userMessages[i][1] = Object.entries(singleUserMessages[1])

        this.userMessages[i][1] = this.userMessages[i][1][this.userMessages[i][1].length - 1];

      })

      this.guja = Object.fromEntries(this.userMessages)
      console.log(this.guja)

      console.log(this.userMessages);

    })

    // Getting the messages from STORE
    this.store.select('data').subscribe(
      (res) => {
        this.messages = res.messages;

        if (this.messages) {
          this.messages = Object.values(this.messages)
        }
      }
    )

    /////////////////////////////////////////////////

    onValue(this.dbRef, (snapshot: any) => {

      // this gets all the available messages for this user

      // Updates with every single new message

      this.allMsg = snapshot.val().users[this.activeUser].messages

      // We get messages here when messaged

      this.store.dispatch(StoreAllMessages({ payload: { allMessages: this.allMsg } }))
      this.getData();
    })
  }

  getData() {
    let newData

    this.store.select('data').subscribe(
      (dataRes) => {
        console.log('got new data in getData()')
        newData = dataRes.allMessages[dataRes.selectedUser]

      }
    )

    this.store.dispatch(StoreMessages({ payload: { messages: newData } }))


  }

  selectChat(info) {

    this.store.dispatch(selectUser({ payload: { selectedUser: info[0] } }))
    this.getData();

    this.store.select('data').subscribe(
      (dataRes) => {
        this.selectedUser = dataRes.selectedUser
      }
    )
  }


  send(form: NgForm) {

    let testMSG = new Message(
      form.value.text,
      new Date(),
      this.selectedUser,
      this.activeUser
    );

    console.log(testMSG)

    this.store.dispatch(SendMsg({
      message:
        testMSG
    }))
    form.reset();
    this.getData();

  }

  logOut() {
    signOut(this.auth).then(() => {
      this.router.navigate(['auth'])
    })
  }

  ngOnDestroy() {
    // this.authSub.unsubscribe();
  }

}
