import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foodtype',
  templateUrl: './foodtype.component.html',
  styleUrls: ['./foodtype.component.scss']
})
export class FoodtypeComponent implements OnInit {
  breakpoint: number;
  height: number;

  constructor(private router: Router) { }

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
      this.breakpoint = 6;
      this.height = 400;

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
      this.breakpoint = 6;
      this.height = 400;

    }
  }
  redirect(typeFood) {
    this.router.navigate(['/food'], { queryParams: { search: typeFood } });
  }

}
