import { createAction, props } from "@ngrx/store";
import { Message } from "src/app/shared/message.model";
// import * as msgModel from '../../shared/message.model'

export const GET_USERS = '[DATA] Get Users';
export const SET_USERS = '[DATA] Set Users';

export const SELECT_USER = '[DATA] Select User';

export const SEND_MSG = '[DATA] Send Message';

export const STORE_MESSAGES = '[DATA] Store Messages';

export const STORE_ALL_MESSAGES = '[DATA] Store All Messages'

export const GetUsers = createAction(
    GET_USERS
)

export const SetUsers = createAction(
    SET_USERS,
    props<{
        payload: {
            users: object[]
        }
    }>()
)

export const selectUser = createAction(
    SELECT_USER,
    props<{
        payload: {
            selectedUser: string
        }
    }>()
)

export const StoreMessages = createAction(
    STORE_MESSAGES,
    props<{
        payload: {
            messages: []
        }
    }>()
)

export const SendMsg = createAction(
    SEND_MSG,
    props<{
        message: Message
    }>()
)

export const StoreAllMessages = createAction(
    STORE_ALL_MESSAGES,
    props<{
        payload: {
            allMessages: [];
        }
    }>()
)