import { ActionReducerMap } from "@ngrx/store";
import * as auth from "../auth/store/auth.reducer";
import * as data from "../messenger/store/data.reducer";

export interface AppState {
    auth: auth.StateHere,
    data: data.StateHere
}

export const AppReducer: ActionReducerMap<AppState> = {
    auth: auth.authReducer,
    data: data.dataReducer
}