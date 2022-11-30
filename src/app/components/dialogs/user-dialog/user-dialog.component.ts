import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user/user.service';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {

  editUser: any;
  mssg: any;
  constructor(private builder: FormBuilder, private dialog: MatDialog, private _userService: UserService, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    if (this.data.id != '' && this.data.id != null) {
      this._userService.getUser(this.data.id).subscribe(response => {
        this.editUser = response;
        this.userForm.controls['usersPassword'].disable();
        this.userForm.setValue({
          usersId: this.editUser.data.usersId,
          usersFirstName: this.editUser.data.usersFirstName,
          usersLastName: this.editUser.data.usersLastName,
          usersUserName: this.editUser.data.usersUserName,
          usersEmail: this.editUser.data.usersEmail,
          usersRole: this.editUser.data.usersRole,
          usersPassword: this.editUser.data.usersPassword
        });
      });
    }
  }

  userForm = this.builder.group({
    usersId: this.builder.control({ value: '', disabled: true }),
    usersFirstName: this.builder.control('', [Validators.required, Validators.pattern('^[A-Z][A-Za-z\s]*$'), Validators.maxLength(13)]),
    usersLastName: this.builder.control('', [Validators.required, Validators.pattern('^[A-Z][A-Za-z\s]*$'), Validators.maxLength(13)]),
    usersUserName: this.builder.control('', [Validators.required, Validators.minLength(5), Validators.maxLength(11)]),
    usersEmail: this.builder.control('', [Validators.required, Validators.email, Validators.pattern('^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    usersRole: this.builder.control('', Validators.required),
    usersPassword: this.builder.control('', [Validators.required, Validators.pattern('^(?=.{8,16}$)(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9]).*$')]),
  });

  saveUser() {
    if (this.userForm.valid) {
      const editId = this.userForm.getRawValue().usersId;
      if (editId != '' && editId != null) {
        this._userService.updateUser(this.userForm.getRawValue()).subscribe(response => {
          this.mssg = response;
          alertify.success(this.mssg.message);
          this.closeDialog();
        }, error => {
          alertify.error(error.error.message);
        });
      }
      else {
        this._userService.createUser(this.userForm.value).subscribe(response => {
          this.mssg = response;
          alertify.success(this.mssg.message);
          this.closeDialog();
        }, error => {
          alertify.error(error.error.message);
        });
      }
    }
  }

  closeDialog() {
    this.dialog.closeAll();
  }
}
