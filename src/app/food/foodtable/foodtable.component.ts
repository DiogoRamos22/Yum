import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';


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

  constructor(private route: ActivatedRoute, private router: Router, private api: ApiService) {
    this.api.getAllDishes()
      .then( res => {
        console.log(res.data);
        this.dishes = res.data;
      })
      .catch( err => {
        console.log(err);
      })

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
}
