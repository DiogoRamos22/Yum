import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormsModule, ReactiveFormsModule, FormGroup, FormControl } from "@angular/forms";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  faSearch = faSearch;

  searchGroup = new FormGroup({
    search: new FormControl('')
  });

  constructor() {
   }

  ngOnInit(): void {
  }

}
