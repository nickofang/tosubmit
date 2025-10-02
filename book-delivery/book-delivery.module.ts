import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BookDeliveryPageRoutingModule } from './book-delivery-routing.module';

import { BookDeliveryPage } from './book-delivery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BookDeliveryPageRoutingModule
  ],
})
export class BookDeliveryPageModule {}
