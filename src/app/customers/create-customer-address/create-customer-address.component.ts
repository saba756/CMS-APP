import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CustomerService } from '../customer.service';
import { ICustomer, IcustomerAddresses, addressTypes,Iaddresses } from '../../shared/models/customer';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-customer-address',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule,  ToastrModule, CommonModule],
  templateUrl: './create-customer-address.component.html',
  styleUrl: './create-customer-address.component.css'
})
export class CreateCustomerAddressComponent {
  customer: IcustomerAddresses[];
  id:number=0;
  customerForm: FormGroup;
  constructor(private cutomerService: CustomerService,private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService) { 
    this.customer = []
    this.customerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required,  Validators.email]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[- +()0-9]+')]),
      city: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      state: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [Validators.required]),
      date_to: new FormControl('', [Validators.required]),
      date_from: new FormControl('', [Validators.required]),
      address_type_description :new FormControl('', [Validators.required]),
      customerId: new FormControl(this.id, [Validators.required]),

    });
  }
  ngOnInit(): void {
    console.log('Test ID:',  this.route.params);
    this.route.params.subscribe(params => {
      this.id = params['id']; // Access the 'id' parameter from the URL
      this.customerForm.patchValue({
        customerId: this.id
      })
    });
    //this.getCustomer()
  }

  
  updateForm(): IcustomerAddresses {
    let custAddress = {} as IcustomerAddresses
     
      custAddress.customerId = this.customerForm.value.customerId
      custAddress.date_from = this.customerForm.value.date_from
      custAddress.date_to  = this.customerForm.value.date_to
      let address = {} as Iaddresses
        address.city =   this.customerForm.value.city,
        address.firstName =  this.customerForm.value.firstName,
        address.lastName =   this.customerForm.value.lastName,
        address.state =  this.customerForm.value.state,
        address.street =   this.customerForm.value.street,
        address.zipCode =  this.customerForm.value.zipCode
      let addresType = {} as addressTypes
          addresType.address_type_description = this.customerForm.value.address_type_description
      custAddress.addressTypes = addresType
      custAddress.addresses = address
      return custAddress;
  }
  onSubmit() {
    console.log(this.customerForm.value)
    let test=this.updateForm();
    console.log("test",test);
    this.cutomerService.createCustomerAddress(test).subscribe(
      () => {
       this.toastr.success('Success!', 'CustomerAddress has been created successfully!');
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
