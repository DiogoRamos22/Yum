import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  id: string;
  name: string;
  area: string;
  foodName: string;
  avaiableQuantity: string;
  color: string;
  price: number;
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
  dishes;
  dataArray;


  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) {
    this.api.getAllDishes()
      .then( res => {
        console.log(res.data);
        this.dishes = res.data;
        this.dataArray = new MatTableDataSource(this.dishes);
      })
      .catch( err => {
        console.log(err);
      });

  }

  ngOnInit(): void {

    this.route.queryParams
      .subscribe(params => {
        this.search = params.search;
      });

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
    this.router.navigate(['/food/buy'], { queryParams: { foodId: id } });
  }
  applyFilter(event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataArray.filter = filterValue.trim().toLowerCase();
    console.log(this.dataArray)
    this.dishes = this.dataArray.filteredData;
  }
}
