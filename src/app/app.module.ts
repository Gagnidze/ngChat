import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth/store/auth.effects';
import { DataEffects } from './messenger/store/data.effects';
import { StoreModule } from '@ngrx/store';
import { AppReducer } from './store/app.reducer';

import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { environment } from 'src/environments/environment';
import { MessengerComponent } from './messenger/messenger.component';
import { AngularFireModule } from '@angular/fire/compat';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MessengerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(AppReducer),
    EffectsModule.forRoot([AuthEffects, DataEffects]),
    AngularFireModule.initializeApp(environment.firebase),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
