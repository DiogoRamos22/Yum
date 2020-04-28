import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from '../../_services/authentication.service';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [SnackBarComponent]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';
  faEnvelope = faEnvelope;
  faLock = faLock;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private snackBar: SnackBarComponent
  ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
        this.snackBar.openSnackBar('Form invalid', 'Dismiss', 2000);
        return;
      }

      this.loading = true;
      this.snackBar.openSnackBar('Signing in...', 'Dismiss', 1000);
      this.authenticationService.login(this.f.email.value, this.f.password.value)
      .then( res => {
          this.router.navigate([this.returnUrl]);
      })
      .catch( err => {
          this.submitted = false;
          this.loading = false;
          this.snackBar.openSnackBar('The email or password is incorrect', 'Dismiss', 2000);
          console.log(err);
      });
  }
}
