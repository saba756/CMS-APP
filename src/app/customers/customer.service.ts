
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ICustomer } from '../shared/models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = 'https://localhost:44322/api/';

  constructor(private http: HttpClient,
    private router: Router) { }

    getCustomer(): Observable<ICustomer[]> {
        return this.http.get<ICustomer[]>(this.baseUrl + 'customers').pipe(map((customers: ICustomer[]) => {
          console.log("customers: ", customers)
          return customers
        }));
      }

      createCustomer(customer: ICustomer){
        return this.http.post(this.baseUrl + 'customers', customer);
      }
      deleteCustomer(customerid:number){
        console.log("customer id",this.baseUrl + 'customer/' + customerid)
        return this.http.delete(this.baseUrl + 'customers/' + customerid);
      }
}
