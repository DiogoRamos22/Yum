import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatRadioChange } from '@angular/material/radio';
import { MatDialog } from '@angular/material/dialog';
import { FoodComponent } from '../food/food.component';

export interface FoodData {
  created_at: string;
  date: string;
  id: string;
  img: string;
  ingredients: string;
  name: string;
  number: string;
  points: string;
  price: string;
  timesRated: string;
  type: string;
  updated_at: any;
  userId: string;
}
@Component({
  selector: 'app-foodtable',
  templateUrl: './foodtable.component.html',
  styleUrls: ['./foodtable.component.scss']
})
export class FoodtableComponent implements OnInit {
  search: string;
  breakpoint: number;
  height: number;
  dishes: FoodData[];
  dataArray: MatTableDataSource<FoodData>;
  typeOfDishChosen: string;
  typeDishes: string[] = ['All', 'Pizza', 'Sushi', 'Fast food', 'Desserts', 'Healthy', 'Traditional'];
  searchDish: any;
  quantity: string;
  foodId: string;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService, public dialog: MatDialog) {
    this.api.getAllDishes()
      .then( res => {
        const food: FoodData[] = [];
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < res.data.length; i++) {
          food.push(this.convertData(res.data[i]));
        }

        this.dataArray = new MatTableDataSource(food);
        this.dataArray.filterPredicate = (data: FoodData, filters: string) => {
          const matchFilter = [];
          const filterArray = filters.split('+');
          const columns = (Object as any).values(data);
          filterArray.forEach(filter => {
            const customFilter = [];
            columns.forEach(column => {
              customFilter.push(column.toLowerCase().includes(filter));
            });
            matchFilter.push(customFilter.some(Boolean));
          });
          return matchFilter.every(Boolean); // both filters to use only all of the filters use every instead of some
        };
        this.dataArray.paginator = this.paginator;
        this.dataArray.sort = this.sort;


        this.route.queryParams
        .subscribe(params => {
          this.dataArray.filter = params.search.trim().toLowerCase();

          this.dishes = this.dataArray.filteredData;

        });
      })
      .catch( err => {
        console.log(err);
      });

  }

  convertData(data): FoodData {
    if (data.updated_at === null) {
      data.updated_at = '';
    }
    return {
      created_at: data.created_at,
      date: data.date,
      id: data.id,
      img: data.img,
      ingredients: data.ingredients,
      name: data.name,
      number: data.number,
      points: data.points,
      price: data.price,
      timesRated: data.timesRated,
      type: data.type,
      updated_at: data.updated_at,
      userId: data.userId,
    };
  }

  ngOnInit(): void {
    if (window.innerWidth <= 1300) {
        if (window.innerWidth <= 750) {
          if (window.innerWidth <= 500) {
            this.breakpoint = 1;
            this.height = 500;
          } else {
            this.breakpoint = 2;
            this.height = 425;
          }
        } else {
          this.breakpoint = 3;
          this.height = 450;
        }
      } else {
        this.breakpoint = 4;
        this.height = 500;
      }

  }

  onResize(event) {
    if (event.target.innerWidth <= 1300) {
      if (event.target.innerWidth <= 750) {
        if (event.target.innerWidth <= 500) {
          this.breakpoint = 1;
          this.height = 500;
        } else {
          this.breakpoint = 2;
          this.height = 450;
        }
      } else {
        this.breakpoint = 3;
        this.height = 450;
      }
    } else {
      this.breakpoint = 4;
      this.height = 500;

    }
  }
  buyFood(id) {
    const dialogRef = this.dialog.open(FoodComponent, {
      width: '350px',
      data: {
        quantity: this.quantity,
        id
      }
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log('Dialog Closed');
      this.quantity = res;
    });
  }
  applyFilter(radioChange: MatRadioChange) {
    if (this.typeOfDishChosen !== 'All' && this.searchDish !== undefined && this.searchDish !== '') {
      this.dataArray.filter = this.typeOfDishChosen.trim().toLowerCase() + '+' + this.searchDish.trim().toLowerCase();
      this.dishes = this.dataArray.filteredData;
    // tslint:disable-next-line: max-line-length
    } else if ((this.searchDish === undefined && this.typeOfDishChosen === 'All') || (this.searchDish === '' && this.typeOfDishChosen === 'All') ) {
      this.dataArray.filter = '';
      this.dishes = this.dataArray.filteredData;
    } else if (this.searchDish === '') {
      this.dataArray.filter = this.typeOfDishChosen.trim().toLowerCase();
      this.dishes = this.dataArray.filteredData;
     } else if (this.typeOfDishChosen === 'All') {
      this.dataArray.filter = this.searchDish.trim().toLowerCase();
      this.dishes = this.dataArray.filteredData;
     } else {
      this.dataArray.filter = this.typeOfDishChosen.trim().toLowerCase();
      this.dishes = this.dataArray.filteredData;
    }
  }
  applySearch(event) {

    const filterValue = (event.target as HTMLInputElement).value;
    if ( this.typeOfDishChosen === undefined) {
      this.dataArray.filter = filterValue.trim().toLowerCase();
      this.dishes = this.dataArray.filteredData;
    } else if (filterValue === '' && this.typeOfDishChosen === 'All') {
      this.dataArray.filter = '';
      this.dishes = this.dataArray.filteredData;
    } else if (this.typeOfDishChosen === 'All') {
      this.dataArray.filter = filterValue.trim().toLowerCase();
      this.dishes = this.dataArray.filteredData;
    } else {
      this.dataArray.filter = this.typeOfDishChosen.trim().toLowerCase() + '+' + filterValue.trim().toLowerCase();
      this.dishes = this.dataArray.filteredData;

    }

  }
}
