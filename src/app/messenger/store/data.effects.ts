import { Injectable } from "@angular/core";
import { getDatabase, push, ref, set } from "@firebase/database";
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { Store } from "@ngrx/store";
import { initializeApp } from "firebase/app";
import { switchMap } from "rxjs/operators";
import { AppState } from "src/app/store/app.reducer";
import { environment } from "src/environments/environment";

import * as dataActions from './data.actions'


const app = initializeApp(environment.firebase);
const db = getDatabase();
const dbRef = ref(db);

@Injectable()

export class DataEffects {

    sendMessage = createEffect(
        () =>
            this.actions$.pipe(
                ofType(dataActions.SendMsg),
                switchMap(
                    (sendMessageAct) => {

                        // ADD QUERY EXISTENCE CHECKING HERE 
                        console.log('SEND MSG EFFECTS')

                        set(push(ref(db, '/users/' + sendMessageAct.message.from + '/messages/' + sendMessageAct.message.to)), sendMessageAct.message)
                        return set(push(ref(db, '/users/' + sendMessageAct.message.to + '/messages/' + sendMessageAct.message.from)), sendMessageAct.message)

                    }
                )
            ), { dispatch: false }
    )

    // getData = createEffect(
    //     () =>
    //         this.actions$.pipe(
    //             ofType(dataActions.selectUser),
    //             map(
    //                 (getDataAct) => {
    //                     let messages
    //                     onValue(dbRef, (snapshot: any) => {
    //                         // this.users = snapshot.val().users;
    //                         this.store.select('auth').subscribe(
    //                             (res) => {
    //                                 const activeUser = res.uid;
    //                                 messages = snapshot.val().users[res.uid].messages
    //                                 // [this.selectedUser]

    //                                 // console.log(messages);
    //                                 // console.log(getDataAct.payload.selectedUser)
    //                                 messages = messages[getDataAct.payload.selectedUser]
    //                                 // this.users = Object.entries(this.users)
    //                             }
    //                         )

    //                     })

    //                     return dataActions.getMessages({ payload: { messages: messages } })


    //                     // return dataActions.SendMsg({message: new Message('',new Date(), '', '')})
    //                 }
    //             )
    //         ),
    //     //  { dispatch: false }
    // )


    constructor(
        private actions$: Actions,
        private store: Store<AppState>
    ) { }
}


                // export const Login = createAction(
                    //     LOGIN,
                    //     props<{
                        //         payload: {
                            //             email: string,
                            //             password: string
                            //         }
                            //     }>()
                            // )



                            // getData = createEffect(
                            //     () =>
                            //         this.actions$.pipe(
                            //             ofType(dataActions.GetUsers),
                            //             switchMap((getDataAct) => {

                            //                 const dbRef = ref(db);

                            //                 onValue(dbRef, (snapshot: any) => {
                            //                     const data = snapshot.val();

                            //                     console.log(data);
                            //                 })

                            //             }), map((res) => {

                            //         )

                            // getData = createEffect(
                            //     () =>
                            //         this.actions$.pipe(
                            //             ofType(dataActions.GET_USERS),
                            //             switchMap(
                            //                 () => {
                            //                     const dbRef = ref(db);
                            //                     return onValue(dbRef, (snapshot: any) => {
                            //                         const data = snapshot.val();
                            //                         console.log(data);
                            //                     })
                            //                 }
                            //             ), map(
                            //                 (res) => {
                            //                     return dataActions.SetUsers({ payload: { users: [] } })
                            //                 }
                            //             )
                            //         )
                            // )








                            // const newPostKey = push(child(ref(db), 'posts')).key;
                        // console.log(newPostKey);

                        // const updates = {};
                        // updates['/users/' + sendMessageAct.message.to + '/messages/' + sendMessageAct.message.from + '/' + newPostKey] = sendMessageAct.message;
                        // updates['/users/' + sendMessageAct.message.from + '/messages/' + sendMessageAct.message.to + '/' + newPostKey] = sendMessageAct.message;
                        // return update(ref(db), updates);