import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { OrderRow, BookDelivery } from './action/action.service';

@Injectable({
  providedIn: 'root',
})
export class MockBackendService implements InMemoryDbService {
  createDb() {
    const salesOrders: OrderRow[] = [
      { orderId: 'O001', orderDate: '2025-09-17', lines: 3, orderedBy: 'Alice', status: 'Ready', selected: false },
      { orderId: 'O002', orderDate: '2025-09-16', lines: 2, orderedBy: 'Bob', status: 'Pending', selected: false },
    ];

    const bookDeliveries: BookDelivery[] = [
      { deliveryId: 'B001', bookTitle: 'Book A', customerName: 'Alice', deliveryDate: '2025-09-17', status: 'Pending' },
      { deliveryId: 'B002', bookTitle: 'Book B', customerName: 'Bob', deliveryDate: '2025-09-16', status: 'Delivered' },
    ];

    return { salesOrders, bookDeliveries };
  }

  // Custom route for /api/currentUser
  get(reqInfo: RequestInfo) {
    if (reqInfo.collectionName === 'currentUser') {
      return reqInfo.utils.createResponse$(() => {
        return {
          body: { name: 'Nicko Fang' },
          status: 200,
          headers: reqInfo.headers,
          url: reqInfo.url
        };
      });
    }

    return undefined; // fallback to default behavior
  }
}