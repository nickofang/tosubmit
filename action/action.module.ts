import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AgGridModule } from 'ag-grid-angular';

import { ActionPageRoutingModule } from './action-routing.module';
import { ActionPage } from './action.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgGridModule,           // important
    ActionPageRoutingModule
  ],
  declarations: [ActionPage] // normal component
})
export class ActionPageModule {}
