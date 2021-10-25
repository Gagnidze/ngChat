import { Injectable } from '@angular/core';

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as authActions from './auth.actions';
import { switchMap, tap } from 'rxjs/operators';
import { initializeApp } from '@firebase/app';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducer';
import { getDatabase, ref, set } from 'firebase/database';
import { Router } from '@angular/router';
import * as fbStorageImport from 'firebase/storage'

const app = initializeApp(environment.firebase);
const Auth = getAuth();

const storage = fbStorageImport.getStorage();

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
                        
                        console.log(res);
                        console.log(signupAct.payload)
                        console.log(signupAct.payload.username)
                        
                        const storageRef = fbStorageImport.ref(storage, signupAct.payload.username);
                        
                        fbStorageImport.uploadBytes(storageRef, signupAct.payload.photo)
                        .then((fbUploadRes)=> {
                            fbStorageImport.getDownloadURL(storageRef).then(
                                (imageURLRes) => {
                                    
                                    console.log(imageURLRes);
                                    
                                    set(ref(db, 'users/' + res.user.uid), {
                                        email: res.user.email,
                                        username: signupAct.payload.username,
                                        lastDate: new Date(2010, 12, 31),
                                        uid: res.user.uid,
                                        messages: [''],
                                        imageURL: imageURLRes
                                    });
                                }
                            )
                            console.log(res);
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

    authSuccessFul = createEffect(
        () =>
            this.actions$.pipe(
                ofType(authActions.AuthSuccess),
                tap(() => {
                    console.log('infinite loop')
                    this.router.navigate(['messenger'])
                })
            ), { dispatch: false }
    )

    constructor(
        private actions$: Actions,
        private store: Store<AppState>,
        private router: Router
    ) { }
}