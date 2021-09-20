import { Injectable } from '@angular/core';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as authActions from './auth.actions';
import { switchMap } from 'rxjs/operators';
import { initializeApp } from '@firebase/app';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { child, get, getDatabase, ref, set } from 'firebase/database';

const app = initializeApp(environment.firebase);
const Auth = getAuth();

const db = getDatabase();
const dbRef = ref(db);

@Injectable()

export class AuthEffects {

    authSignup = createEffect(
        () =>
            this.actions$.pipe(
                ofType(authActions.SignupStart),
                switchMap((signupAct) => {
                    return createUserWithEmailAndPassword(Auth, signupAct.payload.email, signupAct.payload.password).then(
                        (res) => {

                            set(ref(db, 'users/' + res.user.uid), {
                                email: res.user.email,
                                username: signupAct.payload.username,
                                uid: res.user.uid,
                                messages: []
                            });

                            return authActions.AuthSuccess({
                                payload: {
                                    email: res.user.email,
                                    uid: res.user.uid,
                                    username: signupAct.payload.username,
                                    token: 'res.user.getIdToken()',
                                    tokenExpDate: new Date(),
                                    messages: []
                                }
                            })
                        }
                    )
                })
            )
    )

    authLogin = createEffect(
        () =>
            this.actions$.pipe(
                ofType(authActions.Login),
                switchMap((loginAct) => {
                    return signInWithEmailAndPassword(Auth, loginAct.payload.email, loginAct.payload.password).then(
                        (res) => {

                            res.user.email
                            res.user.uid

                            let messages;

                            return authActions.AuthSuccess({
                                payload: {
                                    email: res.user.email,
                                    uid: res.user.uid,
                                    username: 'get this somehow',
                                    messages: messages,
                                    token: '',
                                    tokenExpDate: new Date()
                                }
                            })
                        }
                    )
                })
            )
    )

    constructor(
        private actions$: Actions,
        private store: Store<AppState>
    ) { }
}