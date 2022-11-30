import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as alertify from 'alertifyjs';
import { ActiveUser } from 'src/app/models/activeUser';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  response: any;

  constructor(private _authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      UsersUserName: ['', Validators.required],
      UsersPassword: ['', Validators.required]
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSumbit() {
    if (this.loginForm.valid) {
      this._authService.login(this.loginForm.value).subscribe(response => {
        this.response = response;
        this._authService.storeToken(this.response.data);
        this._authService.getMe().subscribe(response => {
          this.response = response;
          this._authService.storeUser(this.response.result.data);
        });
        this.router.navigate(['home']);
        alertify.success(this.response.message);
      }, error => {
        alertify.error(error.error.message);
      });


    }
    else {
      this.validateAllFormFields(this.loginForm);
      alertify.error("Form is invalid.");
    }

  }

  private validateAllFormFields(formGrop: FormGroup) {
    Object.keys(formGrop.controls).forEach(field => {
      const control = formGrop.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      }
      else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    })
  }

}

