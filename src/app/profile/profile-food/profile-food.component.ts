import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';

@Component({
  selector: 'app-profile-food',
  templateUrl: './profile-food.component.html',
  styleUrls: ['./profile-food.component.scss'],
  providers: [SnackBarComponent]
})
export class ProfileFoodComponent implements OnInit, OnDestroy {
  breakpoint: number;
  height: number;
  dishes: string[];
  quantity: string;
  pollingProfileFood: any;

  constructor(private api: ApiService, public dialog: MatDialog, private snackBar: SnackBarComponent) {}

  ngOnInit(): void {
    this.api
      .getUserDishes(JSON.parse(localStorage.getItem('currentUser')).id)
      .then((res) => {
        this.dishes = res.data;
        this.pollingProfileFood = setInterval(() => {
          this.api
            .getUserDishes(JSON.parse(localStorage.getItem('currentUser')).id)
            .then((upRes) => {
              this.dishes = upRes.data;
            })
            .catch((err) => {
              this.snackBar.openSnackBar(
                'Error updating food',
                'Dismiss',
                2000
              );
            });
        }, 30000);
      })
      .catch((err) => {
        this.snackBar.openSnackBar(
          'Something went wrong... Please Reload the page or Login again',
          'Dismiss',
          2000
        );
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
  ngOnDestroy(): void {
    clearInterval(this.pollingProfileFood);
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

  editDish(dishId) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '350px',
      data: {
        quantity: this.quantity,
        dishId,
      },
    });
    dialogRef.afterClosed().subscribe((res) => {
      console.log('Dialog Closed');
      this.quantity = res;
    });
  }
}
