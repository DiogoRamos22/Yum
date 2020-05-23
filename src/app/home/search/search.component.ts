import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
  searchForm: FormGroup;
  isLogged = false;

  get f() {
    return this.searchForm.controls;
  }

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthenticationService
  ) {
    if (this.auth.currentUserValue) {
      this.isLogged = true;
    }
  }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: [''],
    });
  }

  search() {
    if (this.isLogged) {
      this.router.navigate(['/food'], {
        queryParams: { search: this.f.search.value },
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
