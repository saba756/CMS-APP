import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {
  loginForm: FormGroup;

  constructor(
    private accountService: AccountService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[0\\w-]{2,4}$'),
      ]),
      password: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    console.log("login")
    this.createLoginForm();
    console.log("login")
  }

createLoginForm() {
  this.loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[\\w-\\.]+@([\\w-]+\\.)+[0\\w-]{2,4}$'),
    ]),
    password: new FormControl('', [Validators.required]),
  });
}
onSubmit() {
  console.log("VALUE",this.loginForm.value)
  this.accountService.login(this.loginForm.value).subscribe(
    () => {
      this.router.navigateByUrl('/customer');
    },
    (error) => {
      console.log(error);
    }
  );
}
}