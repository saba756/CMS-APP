import { Component } from '@angular/core';
import { ICustomer } from '../../shared/models/customer';
import { CustomerService } from '../customer.service';
import {CommonModule} from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, ModalComponent,],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  customer: ICustomer[];

  constructor(private cutomerService: CustomerService, private modalComponent: ModalComponent,  
    private router: Router,private toastr: ToastrService) { 
    this.customer = []
  }

  ngOnInit() {
    this.getCustomer();
  }

  getCustomer() {
    this.cutomerService.getCustomers().subscribe((cus: ICustomer[]) =>{
      console.log("customers ---> ", cus)
      this.customer = cus
    })
  }

  openModal() {
    console.log("opening modal .... ")
   // this.modalComponent.openModal();
   this.router.navigateByUrl('create-customer');
  }
  delete(id:any){
console.log("in delete", id)
 this.cutomerService.deleteCustomer(id).subscribe(response => {
  this.getCustomer();
  this.toastr.success('Success!', 'Customer has been deleted successfully!');
 }, error => {
    console.log("failed to delete customer... ")
 });
  }
  editCustomer(id:any){
    this.router.navigate(['edit-customer/'+id]);
  }
  ViewAddresses(id:any){
    console.log("test id",id)
    this.router.navigate(['address-detail/'+id]);
  }
  createCustomerAdress(id:any){
console.log("id",id)
this.router.navigate(['create-address/'+id]);
  }
  }

