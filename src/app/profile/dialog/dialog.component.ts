import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { SnackBarComponent } from 'src/app/snack-bar/snack-bar.component';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
  providers: [SnackBarComponent]
})
export class DialogComponent implements OnInit {

  moneyForm: FormGroup;

  constructor(
    public api: ApiService,
    public snackBar: SnackBarComponent,
    public dialogRef: MatDialogRef<DialogComponent>,
    public formBuilder: FormBuilder
    ) {}

  ngOnInit() {
    this.moneyForm = this.formBuilder.group({
      money: ['']
    });
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  get f() { return this.moneyForm.controls; }

  onSubmit() { 
    this.snackBar.openSnackBar('Adding money ...', 'Dismiss', 2000);
    this.addMoney(this.f.money.value); 
  }

  addMoney(value) {
    this.api.addMoney(value)
      .then( res => {
        this.snackBar.openSnackBar('Money added sucessfully', 'Dismiss', 2000);
      })
      .catch( err => {
        console.log(err);
      });
  }
}
