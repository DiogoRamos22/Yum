import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { FoodComponent } from 'src/app/food/food/food.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';

@Component({
  selector: 'app-user-food',
  templateUrl: './user-food.component.html',
  styleUrls: ['./user-food.component.scss'],
  providers: [SnackBarComponent]
})
export class UserFoodComponent implements OnInit {
  breakpoint: number;
  height: number;
  userId: any;
  dishes: any;
  quantity: any;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    public dialog: MatDialog,
    public snackbar: SnackBarComponent
  ) {
    this.route.params.subscribe((params) => {
      this.userId = params.userId;
      this.api
        .getUserDishes(this.userId)
        .then((res) => {
          this.dishes = res.data;
        })
        .catch((err) => {
          this.snackbar.openSnackBar('Couldn\'t load dishes', 'Dismiss', 2000);
        });
    });
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
        id,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      this.quantity = res;
    });
  }
}
