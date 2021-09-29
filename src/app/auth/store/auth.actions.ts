import { Message } from "@angular/compiler/src/i18n/i18n_ast";
import { createAction, props } from "@ngrx/store";



export const SIGNUP_START = '[AUTH] Sign Up Start';
export const SIGNUP_SUCCESS = '[AUTH] Sign Up Success';

export const LOGIN = '[AUTH] Log In';
// export const SAVE_PHOTO = '[AUTH] Save Photo';

// export const NAVIGATE = '[AUTH] Navigate'

// export const GET_MESSAGES = '[AUTH] Get Messages';

// export const UPLOAD_USER = '[AUTH] Upload User';




export const SignupStart = createAction(
    SIGNUP_START,
    props<{
        payload: {
            email: string,
            password: string,
            username: string,
            photo?: Blob
        }
    }>()
)

export const AuthSuccess = createAction(
    SIGNUP_SUCCESS,
    props<{
        payload: {
            email: string,
            uid: string,
            username: string,
            token: string,
            tokenExpDate: Date,
            messages: Message[]
        }
    }>()
)

export const Login = createAction(
    LOGIN,
    props<{
        payload: {
            email: string,
            password: string
        }
    }>()
)

// export const SavePhoto = createAction(
//     SAVE_PHOTO,
//     props<{
//         payload: {
//             email: string,
//             photo: File
//         }
//     }>()
// )

// export const Navigate = createAction(
//     NAVIGATE,
//     props<{
//         path: string
//     }>()
// )