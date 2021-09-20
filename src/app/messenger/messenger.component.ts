import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
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
    private store: Store<AppState>
  ) { }

  db = getDatabase();
  dbRef = ref(this.db);
  users;

  messages;

  msg;

  allMsg;

  selectedUser: string;

  activeUser: string;

  authSub: Subscription;

  userMessages = [];


  ngOnInit(): void {
    // Getting the user who logged in from STORE and storing it here (for template)
    this.store.select('auth').subscribe(
      (res) => {
        this.activeUser = res.uid;
      }
    )

    // Getting the list of users from DATABASE to make chat options
    onValue(this.dbRef, (snapshot: any) => {
      this.users = snapshot.val().users;

      console.log(this.users)
      this.users = Object.entries(this.users)
      this.users.forEach(el => {
        if (el[0] === this.activeUser && Object.entries(el[1].messages)) {

          this.userMessages = Object.entries(el[1].messages);
          this.users.splice(this.users.indexOf(el), 1);

        }
      });

      this.userMessages.forEach((singleUserMessages, i) => {
        this.userMessages[i][1] = Object.entries(singleUserMessages[1])

        this.userMessages[i][1] = this.userMessages[i][1][this.userMessages[i][1].length - 1];
      })
      console.log(this.userMessages)
    })

    // Getting the messages from STORE
    this.store.select('data').subscribe(
      (res) => {
        this.messages = res.messages;
        ;
        console.log(this.messages)
        if (this.messages) {
          this.messages = Object.values(this.messages)
        }
      }
    )

    onValue(this.dbRef, (snapshot: any) => {

      // this gets all the available messages for this user

      this.store.select('auth').subscribe(
        (authRes) => {
          if (snapshot.val().users[authRes.uid].messages) {
            this.allMsg = snapshot.val().users[authRes.uid].messages
          } else {
            this.allMsg = [];
          }
          this.store.dispatch(StoreAllMessages({ payload: { allMessages: this.allMsg } }))

        }
      )
    })

    this.store.select('data').subscribe(
      (dataRes) => {

        let lastMessages;

        if (dataRes.allMessages) {
          lastMessages = Object.entries(dataRes.allMessages);
        }

        this.allMsg = lastMessages;

        lastMessages.forEach(el => {
        });
      }
    )
  }

  selectChat(info) {

    this.selectedUser = info[0]
    this.store.dispatch(selectUser({ payload: { selectedUser: info[0] } }))

    // this gets messages for selected user

    onValue(this.dbRef, (snapshot: any) => {

      this.store.select('auth').subscribe(
        (authRes) => {

          this.msg = snapshot.val().users[authRes.uid].messages

          this.msg = this.msg[info[0]]

          this.store.dispatch(StoreMessages({ payload: { messages: this.msg } }))
        }
      )

    })

  }


  send(form: NgForm) {

    this.authSub = this.store.select('auth').subscribe(
      (authRes) => {

        this.store.select('data').subscribe(
          (dataRes) => {
            this.selectedUser = dataRes.selectedUser
          }
        )

        this.store.dispatch(SendMsg({
          message:
            new Message(
              form.value.text,
              new Date(),
              this.selectedUser,
              authRes.uid)
        }))
        form.reset();
      }
    )
  }

  ngOnDestroy() {
    this.authSub.unsubscribe();
  }
}
