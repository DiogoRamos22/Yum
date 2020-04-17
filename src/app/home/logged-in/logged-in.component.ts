import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-in',
  templateUrl: './logged-in.component.html',
  styleUrls: ['./logged-in.component.css']
})
export class LoggedInComponent implements OnInit {
  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }

  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
  }

}
