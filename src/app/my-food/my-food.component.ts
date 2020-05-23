import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-food',
  templateUrl: './my-food.component.html',
  styleUrls: ['./my-food.component.css'],
  providers: [SnackBarComponent],
})
export class MyFoodComponent implements OnInit {
  selectedFile: null;
  newdishForm: FormGroup;
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private snackBar: SnackBarComponent,
    private auth: AuthenticationService,
    private router: Router
  ) {
    if (!this.auth.currentUserValue) {
      router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.newdishForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      ingredients: ['', Validators.required],
      number: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
    });
  }

  get f() {
    return this.newdishForm.controls;
  }

  onSubmit() {
    if (this.newdishForm.invalid && this.selectedFile) {
      this.snackBar.openSnackBar('Form invalid', 'Dismiss', 2000);
      return;
    }

    this.api
      .addDish(
        this.selectedFile,
        this.f.type.value,
        this.f.name.value,
        this.f.ingredients.value,
        this.f.number.value,
        this.f.date.value,
        this.f.price.value
      )

      .then((res) => {
        this.snackBar.openSnackBar(
          'Registering new dish...',
          'Dismiss',
          1000
        );
        this.snackBar.openSnackBar(
          'Dish added successfully',
          'Dismiss',
          2000
        );
        this.newdishForm.reset();
      })
      .catch((err) => {
        this.snackBar.openSnackBar(
          'Something went wrong... Try again',
          'Dismiss',
          2000
        );
        this.api
          .meUser()
          .then((res) => {
            const token = JSON.parse(localStorage.getItem('currentUser')).token;
            res.data.token = token;
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            this.auth.currentUserUpdate(res.data);
            if (res.data.type === 'Client') {
              this.router.navigate(['/']);
            }
          })
          .catch((error) => {
            this.snackBar.openSnackBar(
              'Something went wrong... Login again',
              'Dismiss',
              2000
            );
            this.auth.logout();
            this.router.navigate(['/']);
          });
      });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
  }
}
