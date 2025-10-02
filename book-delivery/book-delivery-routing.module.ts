import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BookDeliveryPage } from './book-delivery.page';

const routes: Routes = [
  {
    path: '',
    component: BookDeliveryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookDeliveryPageRoutingModule {}
