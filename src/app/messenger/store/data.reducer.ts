import { createReducer, on } from "@ngrx/store"
import * as dataActions from './data.actions'


export interface StateHere {
    users: object,
    selectedUser: string,
    messages: [],
    allMessages: []
}

const initState: StateHere = {
    users: {},
    selectedUser: '',
    messages: [],
    allMessages: []
}

export const dataReducer = createReducer(
    initState,

    on(dataActions.SetUsers, (state, action) => {

        return {
            ...state,
            users: action.payload.users

        }

    }),

    on(dataActions.SendMsg, (state, action) => {
        console.log('logging from reducer')
        console.log(action.message)

        return {
            ...state
        }
    }),

    on(dataActions.selectUser, (state, action) => {

        return {
            ...state,
            selectedUser: action.payload.selectedUser
        }
    }),

    on(dataActions.StoreMessages, (state, action) => {
        console.log('STOREMESSAGES REDUCER')
        console.log(action.payload.messages)
        return {
            ...state,
            messages: action.payload.messages
        }
    }),

    on(dataActions.StoreAllMessages, (state, action) => {
        return {
            ...state,
            allMessages: action.payload.allMessages
        }
    })
)