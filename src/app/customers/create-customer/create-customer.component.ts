import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { ICustomer } from '../../shared/models/customer';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent {
  customer: ICustomer[];
  customerForm: FormGroup;
  constructor(private cutomerService: CustomerService,  private router: Router) { 
    this.customer = []
    this.customerForm = new FormGroup({
      customerEmail: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[0\\w-]{2,4}$'),
      ]),
      customerName: new FormControl('', [Validators.required]),
      customerPhone: new FormControl('', [Validators.required]),
      paymentMethodCode: new FormControl('', [Validators.required]),
      paymentDetail: new FormControl('', [Validators.required]),
      otherPaymentDetail: new FormControl('', [Validators.required]),
    });
  }
  createCustomerForm() {
    this.customerForm = new FormGroup({
      customerEmail: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[0\\w-]{2,4}$'),
      ]),
      customerName: new FormControl('', [Validators.required]),
      customerPhone: new FormControl('', [Validators.required]),
      paymentMethodCode: new FormControl('', [Validators.required]),
      paymentDetail: new FormControl('', [Validators.required]),
      otherPaymentDetail: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    console.log("VALUE",this.customerForm.value)
    this.cutomerService.createCustomer(this.customerForm.value).subscribe(
      () => {
        this.router.navigateByUrl('/customer');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
