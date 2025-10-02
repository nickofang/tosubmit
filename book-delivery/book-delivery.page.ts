import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { OrderRow } from '../action/action.service';

@Component({
  selector: 'app-book-delivery',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './book-delivery.page.html',
  styleUrls: ['./book-delivery.page.scss'],
})
export class BookDeliveryPage implements OnInit {
  @Input() selectedOrders: OrderRow[] = [];
  selectedDate: string = '';

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}

  close() {
    this.modalCtrl.dismiss();
  }

confirmBooking() {
  const bookedIds = this.selectedOrders.map(order => order.orderId);
  this.modalCtrl.dismiss({ bookedOrderIds: bookedIds });
}
}