
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { IUser } from '../shared/models/user';
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:44322/api/';

  constructor(private http: HttpClient,
    private router: Router) { }


  login(values: any) {
    console.log("vaues",values)
  return this.http.post<IUser>(this.baseUrl + 'login', values).pipe(
        map((user: IUser) =>{
          if (user.email && user.token) {
              localStorage.setItem('token', user.token)
          }
        })
      );
  }
  
  logout() {
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
  }

}
