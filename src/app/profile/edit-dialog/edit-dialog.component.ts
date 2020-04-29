import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from 'src/app/_services/api.service';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
  providers: [SnackBarComponent]
})
export class EditDialogComponent implements OnInit {

  numberForm: FormGroup;

  constructor(
    public api: ApiService,
    public snackBar: SnackBarComponent,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    public formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this.numberForm = this.formBuilder.group({
      quantity: [''],
      dishId: this.dialogRef._containerInstance._config.data.dishId,
      date: ['']
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  get f() { return this.numberForm.controls; }

  onSubmit() { this.editDish(this.f.dishId.value, this.f.quantity.value, this.f.date.value); }

  editDish(id, amount, date) {
    this.api.editDish(date, id, amount.toString())
    .then(res => {
      console.log(res)
    });
  }
}
