import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import * as alertify from 'alertifyjs';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupForm!: FormGroup;
  mssg: any;
  constructor(private _authorService: AuthService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      UsersFirstName: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][A-Za-z\s]*$'), Validators.maxLength(13)]),
      UsersLastName: new FormControl('', [Validators.required, Validators.pattern('^[A-Z][A-Za-z\s]*$'), Validators.maxLength(13)]),
      UsersUserName: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(11)]),
      UsersEmail: new FormControl('', [Validators.required, Validators.email,Validators.pattern("^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]),
      UsersPassword: new FormControl('', [Validators.required, Validators.pattern('^(?=.{8,16}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$')])
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password";
  }

  onSumbit() {
    if (this.signupForm.valid) {
      this._authorService.register(this.signupForm.value).subscribe(response => {
        this.mssg = response;
        alertify.success(this.mssg.message);
      }, error => {
        alertify.error(error.error.message);
      });
    }
    else {
      this.validateAllFormFields(this.signupForm);
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
