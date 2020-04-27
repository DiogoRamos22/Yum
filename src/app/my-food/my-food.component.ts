import { Component, OnInit } from '@angular/core';
import { ApiService  } from "../_services/api.service";
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
import { SnackBarComponent } from '../snack-bar/snack-bar.component';

@Component({
  selector: 'app-my-food',
  templateUrl: './my-food.component.html',
  styleUrls: ['./my-food.component.css'],
  providers:[SnackBarComponent]
})
export class MyFoodComponent implements OnInit {
  selectedFile: null;
  newdishForm: FormGroup
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private snackBar: SnackBarComponent
  ) { }



  ngOnInit(): void {
    this.newdishForm = this.formBuilder.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      ingredients: ['', Validators.required],
      number: ['', Validators.required],
      date: ['', Validators.required],
      price: ['', Validators.required],
  });
  }

  get f() { return this.newdishForm.controls; }

  onSubmit() {
      if (this.newdishForm.invalid && this.selectedFile) {
        this.snackBar.openSnackBar('Form invalid', "Dismiss", 2000);
        return;
      }

      console.log(this.f.name.value, this.f.type.value, this.f.ingredients.value, this.f.number.value, this.f.date.value, this.f.price.value);

      this.api.addDish(
        this.selectedFile,
        this.f.type.value,
        this.f.name.value,
        this.f.ingredients.value,
        this.f.number.value,
        this.f.date.value,
        this.f.price.value)

        .then( res => {
          this.snackBar.openSnackBar('Registering new dish...', "Dismiss", 1000);
          if (res['Success'] == 'Dish added'){
            this.snackBar.openSnackBar('Dish added successfully', "Dismiss", 2000);
            this.newdishForm.reset();
          }
          else{
            this.snackBar.openSnackBar('Error, try again', "Dismiss", 2000);

          }
        })
        .catch( err => console.log(err));


  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    
  }
  

}
