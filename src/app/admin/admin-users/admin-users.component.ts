import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  loading = false;
  users: User[] = [];
  dataSource;
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'birth', 'gender', 'address', 'district', 'county', 'nickname', 'email'];

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loading = true;
    this.userService.getAll()
      .then(users => {
        this.loading = false;
        this.users = users;
        this.dataSource = new MatTableDataSource(users);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch( err => {
        this.loading = false;
        console.log(err);
      });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
