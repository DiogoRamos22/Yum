import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css'],
  providers: [SnackBarComponent],
})
export class AdminUsersComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  loading = false;
  users: User[] = [];
  dataSource;
  displayedColumns: string[] = [
    'id',
    'firstName',
    'lastName',
    'birth',
    'gender',
    'address',
    'district',
    'county',
    'nickname',
    'email',
  ];
  pollingAdminUsers: any;

  constructor(
    private userService: UserService,
    private snackBar: SnackBarComponent
  ) {}

  ngOnInit(): void {
    this.snackBar.openSnackBar(
      'Loading users...',
      'Dismiss',
      2000
    );
    this.loading = true;
    this.userService
      .getAll()
      .then((users) => {
        this.loading = false;
        this.users = users.data;
        this.dataSource = new MatTableDataSource(users.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.pollingAdminUsers = setInterval(() => {
          this.userService
            .getAll()
            .then((upRes) => {
              this.users = upRes.data;
              this.dataSource = new MatTableDataSource(upRes.data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            })
            .catch((err) => {
              this.snackBar.openSnackBar(
                'Error while updating users',
                'Dismiss',
                2000
              );
            });
        }, 30000);
      })
      .catch((err) => {
        this.snackBar.openSnackBar(
          'Error while loading users',
          'Dismiss',
          2000
        );
        this.loading = false;
      });
  }
  ngOnDestroy(): void {
    clearInterval(this.pollingAdminUsers);
  }
  applyFilter(event: Event) {
    this.snackBar.openSnackBar(
      'Filtering...',
      'Dismiss',
      2000
    );
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
