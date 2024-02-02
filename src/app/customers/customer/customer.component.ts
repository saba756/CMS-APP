import { Component } from '@angular/core';
import { ICustomer } from '../../shared/models/customer';
import { CustomerService } from '../customer.service';
import {CommonModule} from '@angular/common';
import { ModalComponent } from '../../modal/modal.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.css'
})
export class CustomerComponent {
  customer: ICustomer[];

  constructor(private cutomerService: CustomerService, private modalComponent: ModalComponent,  private router: Router) { 
    this.customer = []
  }

  ngOnInit() {
    this.getCustomer();
  }

  getCustomer() {
    this.cutomerService.getCustomer().subscribe((cus: ICustomer[]) =>{
      console.log("customers ---> ", cus)
      this.customer = cus
    })
  }

  openModal() {
    console.log("opening modal .... ")
   // this.modalComponent.openModal();
   this.router.navigateByUrl('create-customer');
  }
  
}
