import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  faUser,
  faEnvelope,
  faLock,
  faBirthdayCake,
  faHome,
} from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../_services/authentication.service';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [SnackBarComponent],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  faUser = faUser;
  faEnvelope = faEnvelope;
  faLock = faLock;
  faBirthdayCake = faBirthdayCake;
  faHome = faHome;
  userTypes = ['Client', 'Vendor', 'Both'];
  genders = ['Female', 'Male', 'Rather not say'];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private auth: AuthenticationService,
    private router: Router,
    private snackBar: SnackBarComponent
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birth: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      district: ['', Validators.required],
      county: ['', Validators.required],
      nickname: ['', Validators.required],
      type: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.submitted = false;
      this.snackBar.openSnackBar(
        'Form invalid',
        'Dismiss',
        2000
      );
      return;
    }
    if (this.f.password.value === this.f.confirmPassword.value) {
      this.loading = true;
      this.auth
        .register(
          this.f.firstName.value,
          this.f.lastName.value,
          this.f.birth.value,
          this.f.gender.value,
          this.f.address.value,
          this.f.district.value,
          this.f.county.value,
          this.f.nickname.value,
          this.f.type.value,
          this.f.email.value,
          this.f.password.value
        )
        .then((res) => {
          this.router.navigate([this.returnUrl]);
          this.snackBar.openSnackBar(
            'Registered successfully, redirecting...',
            'Dismiss',
            2000
          );
        })
        .catch((err) => {
          this.loading = false;
          this.snackBar.openSnackBar(
            'Something went wrong... Try again',
            'Dismiss',
            2000
          );
        });
    } else {
      this.submitted = false;
      this.snackBar.openSnackBar(
        'Passwords don\'t match',
        'Dismiss',
        2000
      );
    }
  }
}
