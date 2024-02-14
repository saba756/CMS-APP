import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Router } from '@angular/router';
import { ICustomer } from '../../shared/models/customer';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-customer',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule,  ToastrModule, CommonModule],
  templateUrl: './create-customer.component.html',
  styleUrl: './create-customer.component.css'
})
export class CreateCustomerComponent {
  customer: ICustomer[];
  customerForm: FormGroup;
  constructor(private cutomerService: CustomerService,private router: Router,private toastr: ToastrService) { 
    this.customer = []
    this.customerForm = new FormGroup({
      customerEmail: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[0\\w-]{2,4}$'),
      ]),
      customerName: new FormControl('', [Validators.required,  Validators.email]),
      customerPhone: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
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
      customerName: new FormControl('', [Validators.required, Validators.email]),
      customerPhone: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
      paymentMethodCode: new FormControl('', [Validators.required]),
      paymentDetail: new FormControl('', [Validators.required]),
      otherPaymentDetail: new FormControl('', [Validators.required]),
    });
  }
  onSubmit() {
    this.cutomerService.createCustomer(this.customerForm.value).subscribe(
      () => {
       this.toastr.success('Success!', 'Customer has been created successfully!');
      this.router.navigateByUrl('/customer');
      },
      (error) => {
        console.log(error);
      }
    );
  }
  get customerFormControl() {
    return this.customerForm.controls;
  }
}
