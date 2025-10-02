// src/app/action/action.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface OrderRow {
  orderId: string;
  orderDate: string;
  lines: number;
  orderedBy: string;
  status: string;
  selected?: boolean;
}

export interface BookDelivery {
  deliveryId: string;
  bookTitle: string;
  customerName: string;
  deliveryDate: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class ActionService {
  private ordersUrl = 'assets/response_1755580502696.json';
  private bookDeliveriesUrl = 'assets/response_bookDeliveries.json';

  constructor(private http: HttpClient) {}

  // Load all sales orders for the grid
getSalesOrders(): Observable<OrderRow[]> {
  return this.http.get<any>(this.ordersUrl).pipe(
    map(data => 
      (data.value || []).map((order: any) => ({
        orderId: order.OrderNum,
        orderDate: order.OrderDate,
        lines: order.Lines ?? 0,      // if you have a Lines property, else default 0
        orderedBy: order.EntryPerson || 'Unknown',
        status: order.ReadyToFulfill ? 'Ready' : 'Pending',
        selected: false
      }))
    )
  );
}


  // Load a single order by ID for modal
  getOrderById(orderId: string): Observable<OrderRow> {
    return this.getSalesOrders().pipe(
      map((orders) => {
        const order = orders.find(o => o.orderId === orderId);
        if (!order) {
          throw new Error(`Order with ID ${orderId} not found`);
        }
        return order;
      })
    );
  }

  // Load book deliveries
  getBookDeliveries(): Observable<BookDelivery[]> {
    return this.http.get<BookDelivery[]>(this.bookDeliveriesUrl).pipe(
      map((deliveries) => deliveries || [])
    );
  }
}
