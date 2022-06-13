import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactPageRoutingModule } from './contact-routing.module';

import { ContactPage } from './contact.page';
import { InputModule } from '../components/input/input.module';
import { ButtonModule } from '../components/button/button.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InputModule,
    ButtonModule,
    ContactPageRoutingModule,
  ],
  declarations: [ContactPage]
})
export class ContactPageModule {}
