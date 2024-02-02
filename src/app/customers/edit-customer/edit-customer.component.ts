import { Component } from '@angular/core';
import { ICustomer } from '../../shared/models/customer';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent {
  customer: ICustomer[];
  customerForm: FormGroup;
  constructor(private cutomerService: CustomerService, private route: ActivatedRoute) { 
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


  ngOnInit(): void {
    console.log('Test ID:',  this.route.params);
    this.route.params.subscribe(params => {
   var id = params['customerId']; // Access the 'id' parameter from the URL
      console.log('Test ID:', id);
    });
  }
getCustomerForm() {
//this.cutomerService.getCustomer()
    // this.customerForm = new FormGroup({
    //   customerEmail: new FormControl('', [
    //     Validators.required,
    //     Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[0\\w-]{2,4}$'),
    //   ]),
    //   customerName: new FormControl('', [Validators.required]),
    //   customerPhone: new FormControl('', [Validators.required]),
    //   paymentMethodCode: new FormControl('', [Validators.required]),
    //   paymentDetail: new FormControl('', [Validators.required]),
    //   otherPaymentDetail: new FormControl('', [Validators.required]),
    // });
  }
  onSubmit() {
    console.log("VALUE",this.customerForm.value)
    this.cutomerService.editCustomer(this.customerForm.value).subscribe(
      () => {
      //  this.router.navigateByUrl('/customer');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
