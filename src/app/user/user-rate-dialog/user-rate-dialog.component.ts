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
    this.api.rateVendor(id, rating)
      .then( res => {
        console.log(res);
      })
      .catch( err => {
        console.log(err);
      });
  }
}