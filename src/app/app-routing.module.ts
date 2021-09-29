import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard'

const noAuthRedirect = () => redirectUnauthorizedTo(['auth'])

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module')
      .then(m =>
        m.AuthModule
      )
  },
  {
    path: 'messenger',
    loadChildren: () => import('./messenger/messenger.module')
      .then(m =>
        m.MessengerModule
      ), canActivate: [AngularFireAuthGuard], data: { authGuardPipe: noAuthRedirect }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
