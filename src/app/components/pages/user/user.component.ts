import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user/user.service';
import { UserDialogComponent } from '../../dialogs/user-dialog/user-dialog.component';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  headerColor = "silver";
  displayedColumns: string[] = ['usersId', 'usersFirstName', 'usersUserName', 'usersEmail', 'usersRole', 'action'];
  dataSource = new MatTableDataSource<User>();
  empdata: any;
  mssg: any;
  activeUser: any = { usersFullName: localStorage.getItem('name'), usersRole: localStorage.getItem('role'), usersId: localStorage.getItem('id') };
  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort !: MatSort;
  constructor(private _userService: UserService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this._userService.getUsers().subscribe(result => {
      this.empdata = result;

      this.dataSource = new MatTableDataSource(this.empdata.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filterChange(event: Event) {
    const filvalue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filvalue;
  }

  openDialog(id: any) {
    const _dialog = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: {
        id: id
      }
    });

    _dialog.afterClosed().subscribe(r => {
      this.getAll();
    });
  }

  editUser(id: any) {
    this.openDialog(id);
  }

  removeUser(id: any) {
    alertify.confirm("Remove User", "do you want to remove this user?", () => {
      this._userService.deleteUser(id).subscribe(r => {
        this.mssg = r;
        this.getAll();
        alertify.success(this.mssg.message);
      }, error => {
        alertify.error(error.error.message);
      });
    }, function () {

    })
  }
}
