import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css'],
  providers: [SnackBarComponent]
})
export class LoggedInComponent implements OnInit {
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private snackBar: SnackBarComponent
    ) { }

  ngOnInit(): void {
  }

  logout() {
    this.snackBar.openSnackBar('Signing out...', 'Dismiss', 1000);
    this.auth.logout();
    this.router.navigate(['/login']);
  }

}
