import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  users = Array.from({length: 50}, (_, k) => createNewUser(k + 1));
  search: string;
  breakpoint: number;
  height: number;

  constructor(private route: ActivatedRoute, private router: Router) {

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

/** Builds and returns a new User. */
function createNewUser(num: number) {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  const precision = 100; // 2 decimals
  const price = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);

  return {
    id: num.toString(),
    name,
    area: AREA[Math.round(Math.random() * (AREA.length - 1))],
    foodName:  FOODNAME[Math.round(Math.random() * (FOODNAME.length - 1))],
    avaiableQuantity: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
    price
  };
}


  // Parte da tabela
  /** Constants used to fill up our data base. */
const COLORS: string[] = [
    'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
    'aqua', 'blue', 'navy', 'black', 'gray'
  ];
const NAMES: string[] = [
    'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
    'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Artur', 'Mia', 'Thomas', 'Elizabeth', 'Andrei', 'Diogo'
  ];
const FOODTYPE: string[] = [
    'tradicional', 'sushi', 'fastfood', 'pizza', 'healthy', 'desserts'
  ];
const AREA: string[] = [
    'Lisboa', 'Oeiras', 'Porto', 'Maia', 'Montijo', 'Campo Grande', 'Odivelas', 'Campo de Ourique', 'Restelo', 'Cacém', 'Alfornelos'
  ];
const FOODNAME: string[] = [
    'pizza', 'caldo verde', 'cheesecake', 'lasanha', 'cozido à portuguesa', 'linguini', 'bife wellington', 'ramen noodles', 'bacalhau',
    'bitoque', 'tiramisu', 'wurst', 'bolo de bolacha', 'seitan', 'sushi'
  ];
