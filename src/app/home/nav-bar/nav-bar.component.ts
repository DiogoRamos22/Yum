import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { AuthenticationService } from "../../_services/authentication.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  isLogged = false;
  constructor(private api: ApiService, private auth: AuthenticationService) {
    if (this.auth.currentUserValue) {
      this.isLogged = true;
  }
   }

  ngOnInit(): void {

  }

}
