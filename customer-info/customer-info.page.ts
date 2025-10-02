import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MsalService } from '@azure/msal-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccountInfo } from '@azure/msal-browser';

@Component({
  selector: 'app-customer-info',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './customer-info.page.html',
  styleUrls: ['./customer-info.page.scss'],
})
export class CustomerInfoPage implements OnInit {

  customerName: string = 'N/A';
  editableName: string = '';
  isEditing: boolean = false; // toggle edit mode

  constructor(private msalService: MsalService) {}

  ngOnInit() {
    const currentAccount: AccountInfo | null = this.msalService.instance.getActiveAccount();
    this.customerName = currentAccount?.idTokenClaims?.['name'] as string || 'Nicko Fang';
    this.editableName = this.customerName;
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
    this.editableName = this.customerName; // reset editable field if cancelling
  }

  saveName() {
    this.customerName = this.editableName;
    this.isEditing = false;
    console.log('Updated name:', this.customerName);
    // ⚡ Call backend API here if needed
  }

  getUserEmail(): string {
    const currentAccount: AccountInfo | null = this.msalService.instance.getActiveAccount();
    return currentAccount?.username || 'N/A';
  }
}
