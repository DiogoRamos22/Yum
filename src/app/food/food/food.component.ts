import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';
import { ApiService } from 'src/app/_services/api.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.component.html',
  styleUrls: ['./food.component.css'],
  providers: [SnackBarComponent]
})
export class FoodComponent implements OnInit {
  quantityForm: FormGroup;

  constructor(
    public api: ApiService,
    public snackBar: SnackBarComponent,
    public dialogRef: MatDialogRef<FoodComponent>,
    public formBuilder: FormBuilder) {}

  ngOnInit() {
    this.quantityForm = this.formBuilder.group({
      quantity: [''],
      id: this.dialogRef._containerInstance._config.data.id
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  get f() { return this.quantityForm.controls; }

  onSubmit() {
    this.buyDish(this.f.id.value, this.f.quantity.value);
  }

  buyDish(id, amount) {
    this.api.buyDish(id, amount)
      .then( res => {
        console.log(res);
      })
      .catch( err => {
        console.log(err);
      })
  }

}
