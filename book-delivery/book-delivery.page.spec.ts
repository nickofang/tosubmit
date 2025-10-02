import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookDeliveryPage } from './book-delivery.page';

describe('BookDeliveryPage', () => { // Define the test suite for BookDeliveryPage
  let component: BookDeliveryPage; //component variable for book delivery page
  let fixture: ComponentFixture<BookDeliveryPage>; 
  // fixture variable to create and manage the component instance

  beforeEach(() => {
    fixture = TestBed.createComponent(BookDeliveryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
