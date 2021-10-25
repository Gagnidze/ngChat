import { Injectable } from "@angular/core";
import { getDatabase, push, ref, set } from "@firebase/database";
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { initializeApp } from "firebase/app";
import { switchMap } from "rxjs/operators";
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
                        set(ref(db, '/users/' + sendMessageAct.message.from + '/lastDate/'), +new Date())
                        
                        set(ref(db, '/users/' + sendMessageAct.message.to + '/lastDate/'), +new Date())
                        return set(push(ref(db, '/users/' + sendMessageAct.message.to + '/messages/' + sendMessageAct.message.from)), sendMessageAct.message)

                    }
                )
            ), { dispatch: false }
    )

    constructor(
        private actions$: Actions
    ) { }
}