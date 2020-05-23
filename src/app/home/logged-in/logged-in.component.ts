import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css'],
  providers: [SnackBarComponent],
})
export class LoggedInComponent implements OnInit {
  isVendor = false;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private snackBar: SnackBarComponent
  ) {
    if (
      this.auth.currentUserValue.type === 'Vendor' ||
      this.auth.currentUserValue.type === 'Both'
    ) {
      this.isVendor = true;
    }
  }

  ngOnInit(): void {}

  logout() {
    this.snackBar.openSnackBar('Signing out...', 'Dismiss', 1000);
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
