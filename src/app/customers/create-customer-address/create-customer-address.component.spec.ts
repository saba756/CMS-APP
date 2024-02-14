import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomerAddressComponent } from './create-customer-address.component';

describe('CreateCustomerAddressComponent', () => {
  let component: CreateCustomerAddressComponent;
  let fixture: ComponentFixture<CreateCustomerAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCustomerAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateCustomerAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
