import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ApiService } from '../../_services/api.service';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';


@Component({
  selector: 'app-admin-statistics',
  templateUrl: './admin-statistics.component.html',
  styleUrls: ['./admin-statistics.component.css'],
  providers: [SnackBarComponent],
})
export class AdminStatisticsComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  loading = false;
  dataSource: MatTableDataSource<unknown>;
  history: {
    nSoldDishes: string;
    nDifferentBuyers: string;
    averagePrice: string;
  };
  displayedColumns: string[] = [
    'nSoldDishes',
    'nDifferentBuyers',
    'averagePrice',
  ];
  pollingAdminHistory: any;
  //variables for statistics
  averagePrice:any;
  nDifferentBuyers:any;
  nSoldDishes:any;
  mostExpensiveDish:any;
  mostExpensiveOrder:any;
  statisticsArray:any;
  //
  dishesHistory:any;


  constructor(private api: ApiService, private snackBar: SnackBarComponent) {}

  ngOnInit(): void {
    this.snackBar.openSnackBar(
      'Loading statistics...',
      'Dismiss',
      2000
    );
    this.api
      .GetAllHistory()
      .then((history) => {
        
        this.loading = false;
        // big brain statistics
        this.dishesHistory = history.data;

        let sumPrices = 0.0;
        let numDishesSold = 0;
        let numDifferentBuyers = 0;
        let differentBuyers = [];
        let mostExpensiveDish = 0.0;
        let mostExpensiveOrder = 0.0;
        for (let i of this.dishesHistory) {
          //console.log(i);

          numDishesSold += parseFloat(i.number);
          sumPrices += parseFloat(i.ammountPaid);
      
          let currentCustomer = String(i.idCustumer);
          //check if it is a new customer
          if(differentBuyers.some(x => x === currentCustomer) != true){
            numDifferentBuyers += 1;
            differentBuyers.push(currentCustomer);
          }
          
          if((i.ammountPaid) > mostExpensiveOrder){
            mostExpensiveOrder = i.ammountPaid;
          }

          if((i.ammountPaid/i.number)>mostExpensiveDish){
            mostExpensiveDish = (i.ammountPaid/i.number)
          }
      }


      let num = (sumPrices/ numDishesSold);
      this.averagePrice = (Math.round(num * 100) / 100).toFixed(2);
      this.nDifferentBuyers = numDifferentBuyers;
      this.nSoldDishes = numDishesSold;
      this.mostExpensiveDish = mostExpensiveDish;
      this.mostExpensiveOrder = mostExpensiveOrder;

      console.log("averagePrice", this.averagePrice);
      console.log("numberDifferentPrices", this.nDifferentBuyers);
      console.log("numberSoldDishes", this.nSoldDishes);


      this.statisticsArray = [this.nSoldDishes, this.nDifferentBuyers, this.averagePrice, this.mostExpensiveDish, this.mostExpensiveOrder];
      

      console.log(this.statisticsArray)

        //
        this.dataSource = new MatTableDataSource(this.statisticsArray); // array com 3 valores
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
