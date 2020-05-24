import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/_services/api.service';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';

@Component({
  selector: 'app-admin-food',
  templateUrl: './admin-food.component.html',
  styleUrls: ['./admin-food.component.css'],
  providers: [SnackBarComponent],
})
export class AdminFoodComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = [
    'id',
    'name',
    'Created at',
    'Date available',
    'Image URL',
    'Ingredients',
    'Local',
    'N.Dishes',
    'Rating',
    'Price',
    'Times rated',
    'type',
    'Updated at',
    'UserId',
  ];

  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  pollingAdminFood: any;

  constructor(private api: ApiService, private snackBar: SnackBarComponent) {
    // Assign the data to the data source for the table to render
  }

  ngOnInit(): void {
    this.snackBar.openSnackBar(
      'Loading dishes...',
      'Dismiss',
      2000
    );
    this.api
      .getAllDishes()
      .then((res) => {
        this.dataSource = new MatTableDataSource(res.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.pollingAdminFood = setInterval(() => {
          this.api
            .getAllDishes()
            .then((upRes) => {
              this.dataSource = new MatTableDataSource(upRes.data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            })
            .catch((err) => {
              this.snackBar.openSnackBar(
                'Error while updating dishes',
                'Dismiss',
                2000
              );
            });
        }, 30000);
      })
      .catch((err) => {
        this.snackBar.openSnackBar(
          'Error while loading dishes',
          'Dismiss',
          2000
        );
      });
  }
  ngOnDestroy(): void {
    clearInterval(this.pollingAdminFood);
  }
  applyFilter(event: Event) {
    this.snackBar.openSnackBar(
      'Filtering...',
      'Dismiss',
      500
    );

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
