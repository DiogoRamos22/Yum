import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/_services/api.service';
import { RateDialogComponent } from '../rate-dialog/rate-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
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
  displayedColumns: string[] = ['id', 'idDish', 'idSeller', 'idCostumer', 'number', 'amountPaid', 'created_at', 'rate'];
  points: any;

  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loading = true;
    this.api.GetHistoryCurrentUser()
      .then(history => {
        this.loading = false;
        this.history = history.data;
        this.dataSource = new MatTableDataSource(history.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      })
      .catch( err => {
        this.loading = false;
        console.log(err);
      });
  }
  rate(dishId) {
    const dialogRef = this.dialog.open(RateDialogComponent, {
      width: '350px',
      data: {
        points: this.points,
        dishId
      }
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log('Dialog Closed');
      this.points = res;
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
