import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { MessengerComponent } from './messenger/messenger.component';
import { AngularFireAuthGuard, loggedIn } from '@angular/fire/compat/auth-guard'

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'messenger', component: MessengerComponent, canActivate: [AngularFireAuthGuard], data: { AuthGuardPipe: loggedIn } }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
