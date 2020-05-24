import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../../_services/api.service';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';

@Component({
  selector: 'app-admin-history',
  templateUrl: './admin-history.component.html',
  styleUrls: ['./admin-history.component.css'],
  providers: [SnackBarComponent],
})
export class AdminHistoryComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  loading = false;
  dataSource: MatTableDataSource<unknown>;
  history: {
    id: string;
    idDish: string;
    idSeller: string;
    idCostumer: string;
    number: string;
    amountPaid: string;
    created_at: string;
  };
  displayedColumns: string[] = [
    'id',
    'idDish',
    'idSeller',
    'idCostumer',
    'number',
    'amountPaid',
    'created_at',
  ];
  pollingAdminHistory: any;

  constructor(private api: ApiService, private snackBar: SnackBarComponent) {}

  ngOnInit(): void {
    this.snackBar.openSnackBar(
      'Loading history...',
      'Dismiss',
      2000
    );
    this.loading = true;
    this.api
      .GetAllHistory()
      .then((history) => {
        this.loading = false;
        this.history = history.data;
        this.dataSource = new MatTableDataSource(history.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.pollingAdminHistory = setInterval(() => {
          this.api
            .GetAllHistory()
            .then((upRes) => {
              this.history = upRes.data;
              this.dataSource = new MatTableDataSource(upRes.data);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            })
            .catch((res) => {
              this.snackBar.openSnackBar(
                'Error while updating history',
                'Dismiss',
                2000
              );
            });
        }, 30000);
      })
      .catch((err) => {
        this.snackBar.openSnackBar(
          'Error while loading history',
          'Dismiss',
          2000
        );
        this.loading = false;
      });
  }
  ngOnDestroy(): void {
    clearInterval(this.pollingAdminHistory);
  }
  applyFilter(event: Event) {
    this.snackBar.openSnackBar('Filtering...', 'Dismiss', 500);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
