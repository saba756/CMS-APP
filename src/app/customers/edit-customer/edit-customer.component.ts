import { Component } from '@angular/core';
import { ICustomer } from '../../shared/models/customer';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.css'
})
export class EditCustomerComponent {
  customer: ICustomer[];
 id:number= 0;
  customerForm: FormGroup;
  constructor(private cutomerService: CustomerService,
    private formBuilder:FormBuilder,private route: ActivatedRoute,private toastr: ToastrService,private router: Router) { 
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
      this.id = params['id']; // Access the 'id' parameter from the URL
     
    });
    this.getCustomer()
  }
  getCustomer() {
    this.cutomerService.getCustomer(this.id).subscribe((cus:ICustomer) =>{
      this.createCustomerForm(cus)
    })
  }
  createCustomerForm(cus:ICustomer) {
    this.customerForm = new FormGroup({
      customerEmail: new FormControl(cus.customerEmail, [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[0\\w-]{2,4}$'),
      ]),
    
      customerName: new FormControl(cus.customerName, [Validators.required]),
      customerPhone: new FormControl(cus.customerPhone, [Validators.required]),
      paymentMethodCode: new FormControl(cus.paymentMethodCode, [Validators.required]),
      paymentDetail: new FormControl(cus.paymentDetail, [Validators.required]),
      otherPaymentDetail: new FormControl(cus.otherPaymentDetail, [Validators.required]),
    });
  }
  onSubmit() {
    console.log("VALUE",this.customerForm.value)
    this.cutomerService.editCustomer(this.id,this.customerForm.value).subscribe(
      () => {
        this.toastr.success('Success!', 'Customer has been updated successfully!');
        this.router.navigateByUrl('/customer');
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
