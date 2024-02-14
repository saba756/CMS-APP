import { Component, OnInit } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';

import { SelectionModel } from '@angular/cdk/collections';
import { CommonModule } from '@angular/common';
import { CustomerService } from '../customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICustomer, IcustomerAddresses, Iaddresses } from '../../shared/models/customer';
;
@Component({
  selector: 'app-address-detail',
  standalone: true,
  imports: [MatTableModule, MatCheckboxModule, CommonModule],
  templateUrl: './address-detail.component.html',
  styleUrl: './address-detail.component.css'
})

export class AddressDetailComponent implements OnInit  {
  displayedColumns: string[] = [ 'Name', 'city','street','state', 'zipCode'];
  customer: ICustomer;
  dataSource = new MatTableDataSource<IcustomerAddresses>();
  selection = new SelectionModel<any>(true, []);
  id:number= 0;
 
  constructor(private cutomerService: CustomerService,
    private router: Router,private toastr: ToastrService,private route: ActivatedRoute) { 
    this.customer = {} as ICustomer;

  }
  ngOnInit(): void {
    console.log('Test ID:',  this.route.params);
    this.route.params.subscribe(params => {
      this.id = params['id']; // Access the 'id' parameter from the URL
     
    });
    this.getCustomer()
  }
  /** Whether the number of selected elements matches the total number of rows. */

  getCustomer() {
    this.cutomerService.getCustomer(this.id).subscribe((cus:ICustomer) =>{
      this.customer= cus;
      console.log("customers ---> ", cus)
      this.dataSource = new MatTableDataSource<IcustomerAddresses>(cus.customerAddresses);
      console.log("dataa ---> ", this.dataSource )
    })
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    console.log("selecting.... ")
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }
  selectRow(row: ICustomer){
    console.log("row selected: ", row)
  }
 
}
