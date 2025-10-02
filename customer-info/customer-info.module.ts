import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerInfoPageRoutingModule } from './customer-info-routing.module';
import { CustomerInfoPage } from './customer-info.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerInfoPageRoutingModule,
    CustomerInfoPage,  // ✅ Import the standalone component here
  ],
})
export class CustomerInfoPageModule {}
