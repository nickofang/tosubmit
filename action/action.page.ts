import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi } from 'ag-grid-community';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

// Define interface for order row
interface OrderRow {
  orderId: string;
  orderDate: string;
  lines: number;
  orderedBy: string;
  status: string;
  selected?: boolean;
}

@Component({
  selector: 'app-action',
  standalone: false,
  templateUrl: './action.page.html',
  styleUrls: ['./action.page.scss'],
})
export class ActionPage implements OnInit {
  private gridApi!: GridApi<OrderRow>;

  columnDefs: ColDef[] = [
    {
      headerName: 'Select',
      field: 'selected',
      width: 80,
      cellRenderer: this.checkboxCellRenderer.bind(this),
      headerCheckboxSelection: false,
      checkboxSelection: false
    },
    { headerName: 'Order #', field: 'orderId' },
    { headerName: 'Order Date', field: 'orderDate' },
    { headerName: 'Lines', field: 'lines' },
    { headerName: 'Ordered By', field: 'orderedBy' },
    { headerName: 'Status', field: 'status' }
  ];

  defaultColDef = {
    sortable: true,
    filter: true
  };

rowData: OrderRow[] = [
  { orderId: 'O001', orderDate: '2008-11-04', lines: 3, orderedBy: 'Addison Incs', status: 'Ready', selected: false },
  { orderId: 'O002', orderDate: '2009-02-15', lines: 2, orderedBy: 'Beta Corp', status: 'Pending', selected: false },
  { orderId: 'O003', orderDate: '2009-07-21', lines: 1, orderedBy: 'Omega Supplies', status: 'Ready', selected: false },
  { orderId: 'O004', orderDate: '2010-03-10', lines: 4, orderedBy: 'Delta Logistics', status: 'Ready', selected: false },
  { orderId: 'O005', orderDate: '2010-08-05', lines: 2, orderedBy: 'Nova Retail', status: 'Delivered', selected: false },
  { orderId: 'O006', orderDate: '2011-01-19', lines: 5, orderedBy: 'Zenith Tools', status: 'Pending', selected: false },
  { orderId: 'O007', orderDate: '2011-06-30', lines: 3, orderedBy: 'Vertex Systems', status: 'Ready', selected: false },
  { orderId: 'O008', orderDate: '2008-12-22', lines: 1, orderedBy: 'Echo Electronics', status: 'Cancelled', selected: false },
  { orderId: 'O009', orderDate: '2009-09-14', lines: 6, orderedBy: 'Nimbus Energy', status: 'Ready', selected: false },
  { orderId: 'O010', orderDate: '2010-11-11', lines: 2, orderedBy: 'Fusion Foods', status: 'Delivered', selected: false }
];

  modules = [];
  userName: string = 'Customer';

  constructor(
    private modalCtrl: ModalController,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  onGridReady(params: any) {
    this.gridApi = params.api;
  }

  checkboxCellRenderer(params: any) {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = params.value;

    checkbox.addEventListener('change', (event) => {
      const checked = (event.target as HTMLInputElement).checked;
      params.node.setDataValue('selected', checked);
      params.node.setSelected(checked);

      const rowIndex = this.rowData.findIndex(r => r.orderId === params.data.orderId);
      if (rowIndex !== -1) {
        this.rowData[rowIndex].selected = checked;
      }
    });

    return checkbox;
  }

async openBookingModal() {
  const selectedRows = this.rowData.filter(row => row.selected && row.status === 'Ready');
  if (!selectedRows.length) return console.log('No orders selected');

  const { BookDeliveryPage } = await import('src/app/book-delivery/book-delivery.page');

  const modal = await this.modalCtrl.create({
    component: BookDeliveryPage,
    componentProps: { selectedOrders: selectedRows }
  });

  await modal.present();
  const { data } = await modal.onDidDismiss();

  if (data?.bookedOrderIds) {
    this.rowData = this.rowData.map(order => {
      if (data.bookedOrderIds.includes(order.orderId)) {
        return { ...order, status: 'Booked', selected: false };
      }
      return order;
    });
    this.gridApi.setRowData(this.rowData); // Refresh grid
  }
}
}