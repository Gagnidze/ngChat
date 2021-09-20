import { createReducer, on } from "@ngrx/store";
import { Message } from "src/app/shared/message.model";
import * as AuthActions from './auth.actions'

export interface StateHere {
    email: string,
    username: string,
    uid: string,
    token: string,
    tokenExpDate: Date,
    messages?: Message[],
}

const initState: StateHere = {
    email: '',
    username: '',
    uid: '',
    token: '',
    tokenExpDate: null,
    messages: [],
}

export const authReducer = createReducer(
    initState,

    on(AuthActions.SignupStart, (state, action) => {

        return {
            ...state,
            username: action.payload.username
        }
    }),

    on(AuthActions.AuthSuccess, (state, action) => {
        console.log(action.payload.messages)
        return {
            ...state,
            email: action.payload.email,
            uid: action.payload.uid,
            token: action.payload.token,
            tokenExpDate: action.payload.tokenExpDate,
            // messages: action.payload.messages
        }
    })
)