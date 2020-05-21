import { Component, OnInit } from '@angular/core';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/_services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-rate-dialog',
  templateUrl: './user-rate-dialog.component.html',
  styleUrls: ['./user-rate-dialog.component.css'],
  providers: [SnackBarComponent]
})
export class UserRateDialogComponent implements OnInit {
  ratingForm: FormGroup;

  constructor(
    public api: ApiService,
    public snackBar: SnackBarComponent,
    public dialogRef: MatDialogRef<UserRateDialogComponent>,
    public formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.ratingForm = this.formBuilder.group({
      rating: [''],
      id: this.dialogRef._containerInstance._config.data.vendorId

    });
  }
  get f() { return this.ratingForm.controls; }
  onCloseClick(): void {
    this.dialogRef.close();
  }
  onSubmit() {
    this.rateVendor(this.f.id.value, this.f.rating.value);
  }
  rateVendor(id, rating) {
    if ( rating <= 5 && rating >= 0) {
      this.api.rateVendor(id, rating)
        .then( res => {
          this.dialogRef.close();
          this.snackBar.openSnackBar('You have sucessufully rated the vendor!', 'Dismiss', 2000);
        })
        .catch( err => {
          console.log(err);
          //error snackbar
          this.snackBar.openSnackBar('Looks like something went wrong', 'Dismiss', 2000);
        });
    } else {
      //snackbar saying to input a value from 0-5
      this.snackBar.openSnackBar('Please insert a value between 0 and 5', 'Dismiss', 2000);
    }
  }
}
