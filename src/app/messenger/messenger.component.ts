import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getAuth, signOut } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';
import { Subscription } from 'rxjs';
import { Message } from '../shared/message.model';
import { UtilitiesService } from '../shared/utilities.service';
import { AppState } from '../store/app.reducer';
import { selectUser, SendMsg, StoreAllMessages, StoreMessages } from './store/data.actions';

import * as fbStorageImport from 'firebase/storage'
import { userObject } from '../shared/interfaces.interface';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit, OnDestroy {

  constructor(
    private store: Store<AppState>,
    private router: Router,
    private utService: UtilitiesService
  ) { }

  db = getDatabase();
  dbRef = ref(this.db);
  users = [];

  auth = getAuth();

  // This is same as userMessages but as an Object 
  messageObjects: object;

  // get messages for open chat from STORE
  messages: Message[];

  // Only using for storeAllMessages action
  allMsg;


  storage = fbStorageImport.getStorage();
  storageRef = fbStorageImport.ref

  userImages;


  selectedUser: string;

  activeUser: string;

  authSub: Subscription;

  userMessages = [];

  @ViewChild('chatBox') chatDiv: ElementRef;

  ngOnInit() {

    // Getting the user who logged in from STORE and storing it here (for template and future use)
    this.store.select('auth').subscribe(
      (res) => {
        this.activeUser = res.uid;
      }
    )

    // Getting the list of users from DATABASE to make chat options
    onValue(this.dbRef, (snapshot: any) => {
      this.allMsg = snapshot.val().users[this.activeUser].messages

      // We get messages here when messaged

      this.store.dispatch(StoreAllMessages({ payload: { allMessages: this.allMsg } }))

      this.getData();

      this.users = snapshot.val().users;

      // This property stores only the messages for active user

      // /////////////////////////////////////////////
      
      this.userMessages = Object.entries(this.users[this.activeUser].messages);
      
      delete this.users[this.activeUser]
      
      this.users = Object.entries(this.users)
      
      // SORT MESSAGES BY LATEST MESSAGE

      this.users.sort(
        function(a,b) {
          console.log(a[1].lastDate)
          return +new Date(b[1].lastDate) - +new Date(a[1].lastDate);
        }
      )
      console.log(this.users);

      // SORT MESSAGES BY LATEST MESSAGE
      
      // /////////////////////////////////////////////

      // Getting last messages for message previews

      this.userMessages.forEach((singleUserMessages, i) => {

        this.userMessages[i][1] = Object.entries(singleUserMessages[1])

        this.userMessages[i][1] = this.userMessages[i][1][this.userMessages[i][1].length - 1];

      })

      this.messageObjects = Object.fromEntries(this.userMessages);

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

  this.utService.scroll(this.chatDiv)
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
