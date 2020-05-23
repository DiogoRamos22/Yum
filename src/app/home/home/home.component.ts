import { Component } from '@angular/core';

import { User } from '../../_models/user';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  loading = false;
  currentUser: User;
  userFromApi: User;
  isLogged = true;

  constructor(private authenticationService: AuthenticationService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnInit() {
    this.loading = true;
  }
}
