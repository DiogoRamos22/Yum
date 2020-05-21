import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/_services/api.service';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-rate-dialog',
  templateUrl: './rate-dialog.component.html',
  styleUrls: ['./rate-dialog.component.css'],
  providers: [SnackBarComponent]
})
export class RateDialogComponent implements OnInit {

  rateForm: FormGroup;

  constructor(
    public api: ApiService,
    public snackBar: SnackBarComponent,
    public dialogRef: MatDialogRef<RateDialogComponent>,
    public formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this.rateForm = this.formBuilder.group({
      points: [''],
      dishId: this.dialogRef._containerInstance._config.data.dishId
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  get f() { return this.rateForm.controls; }

  onSubmit() { this.rateDish(this.f.dishId.value, this.f.points.value); }

  rateDish(id, points) {
    console.log(points);
    console.log(id);
    this.api.rateDish(id, points)
      .then( res => {
        console.log(res);
      })
      .catch( err => {
        console.log(err);
      });
  }

}
