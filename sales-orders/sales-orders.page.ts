import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // for *ngFor, ngIf
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular'; // for ion-header, ion-content, etc.

import { ActionService } from '../action/action.service';

// Define the Order interface to match your HTML template
export interface Order {
  orderId: string;
  orderDate: string;
  status: string;
  orderedBy: string;
  lines: number; // number of order lines
}

@Component({
  selector: 'app-sales-orders',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './sales-orders.page.html',
  styleUrls: ['./sales-orders.page.scss'],
})
export class SalesOrdersPage implements OnInit {
  orders: Order[] = [];

  constructor(private actionService: ActionService) {}

  ngOnInit() {
    this.loadOrders();
  }

  loadOrders() {
    this.actionService.getSalesOrders().subscribe((data: any[]) => {
      this.orders = data.map(row => ({
        orderId: row.orderId,
        orderDate: row.orderDate,
        status: row.status,
        orderedBy: row.orderedBy,
        lines: Array.isArray(row.lines) ? row.lines.length : 0
      }));
    });
  }

  doRefresh(event: any) {
    console.log('Refreshing orders...');
    this.loadOrders();
    setTimeout(() => {
      event.target.complete();
    }, 1000);
  }
}
