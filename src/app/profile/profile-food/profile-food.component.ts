import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-food',
  templateUrl: './profile-food.component.html',
  styleUrls: ['./profile-food.component.scss']
})
export class ProfileFoodComponent implements OnInit {
  breakpoint: number;
  height: number;
  dishes: string[];
  quantity: string;

  constructor(private api: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.api.getUserDishes()
      .then( res => {
        this.dishes = res.data;
      })
      .catch( err => {
        console.log(err);
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

  editDish(dishId) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '350px',
      data: {
        quantity: this.quantity,
        dishId
      }
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log('Dialog Closed');
      this.quantity = res;
    });
  }

}
