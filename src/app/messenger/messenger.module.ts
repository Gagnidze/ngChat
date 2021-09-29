import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessengerRoutingModule } from './messenger-routing.module';
import { FormsModule } from '@angular/forms';
import { MessengerComponent } from './messenger.component';


@NgModule({
  declarations: [
    MessengerComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    MessengerRoutingModule
  ]
})
export class MessengerModule { }
