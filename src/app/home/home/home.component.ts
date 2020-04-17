import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../_models/user';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from "../../_services/user.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
    loading = false;
    currentUser: User;
    userFromApi: User;
    isLogged = true;

    constructor(
        private userService: UserService,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.loading = true;
    }
}
