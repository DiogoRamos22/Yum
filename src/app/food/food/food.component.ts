import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';
import { ApiService } from 'src/app/_services/api.service';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
  providers: [SnackBarComponent],
})
export class FoodComponent implements OnInit {
  quantityForm: FormGroup;

  constructor(
    public api: ApiService,
    public snackBar: SnackBarComponent,
    public dialogRef: MatDialogRef<FoodComponent>,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.quantityForm = this.formBuilder.group({
      quantity: [''],
      id: this.dialogRef._containerInstance._config.data.id,
      datetime: [''],
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  get f() {
    return this.quantityForm.controls;
  }

  onSubmit() {
    this.snackBar.openSnackBar(
      'Buying dish...',
      'Dismiss',
      2000
    );
    this.buyDish(this.f.id.value, this.f.quantity.value, this.f.datetime.value);
  }

  buyDish(id, amount, deliveryDate) {
    this.api
      .buyDish(id, amount, deliveryDate)
      .then((res) => {
        this.snackBar.openSnackBar(
          'Dish bought successfully',
          'Dismiss',
          2000
        );
      })
      .catch((err) => {
        this.snackBar.openSnackBar(
          'Error while buying dish',
          'Dismiss',
          2000
        );
      });
  }
}
