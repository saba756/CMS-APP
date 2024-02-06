import { Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { CustomerComponent } from './customers/customer/customer.component';
import { CreateCustomerComponent } from './customers/create-customer/create-customer.component';
import { EditCustomerComponent } from './customers/edit-customer/edit-customer.component';

export const routes: Routes = [
    {path: '', component : LoginComponent },
    {path: 'customer' ,component: CustomerComponent},
    {path: 'create-customer' ,component: CreateCustomerComponent},
    {path: 'edit-customer/:id' ,component: EditCustomerComponent},
];
