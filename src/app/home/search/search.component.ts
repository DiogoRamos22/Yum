import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;
  searchForm: FormGroup;

  get f() { return this.searchForm.controls; }

  constructor(private router: Router, private formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });
  }

  search() {
    this.router.navigate(['/food'], { queryParams: { search: this.f.search.value } });
  }
}
