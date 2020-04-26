import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
export interface UserData {
  id: string;
  name: string;
  area: string;
  foodName: string;
  avaiableQuantity: string;
  color: string;
  price: number;
}
@Component({
  selector: 'app-admin-food',
  templateUrl: './admin-food.component.html',
  styleUrls: ['./admin-food.component.css']
})
export class AdminFoodComponent implements OnInit {

  displayedColumns: string[] = ['id', 'name', 'area', 'foodName', 'avaiableQuantity', 'price'];

  dataSource: MatTableDataSource<UserData>;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor() {
    // Create 100 users
  const users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

  // Assign the data to the data source for the table to render
  this.dataSource = new MatTableDataSource(users);
  }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
/** Builds and returns a new User. */
function createNewUser(num: number) {
  const name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' +
      NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) + '.';

  const precision = 100; // 2 decimals
  const price = Math.floor(Math.random() * (10 * precision - 1 * precision) + 1 * precision) / (1 * precision);

  return {
    id: num.toString(),
    name,
    area: AREA[Math.round(Math.random() * (AREA.length - 1))],
    foodName:  FOODNAME[Math.round(Math.random() * (FOODNAME.length - 1))],
    avaiableQuantity: Math.round(Math.random() * 100).toString(),
    color: COLORS[Math.round(Math.random() * (COLORS.length - 1))],
    price
  };
  }


  // Parte da tabela
  /** Constants used to fill up our data base. */
const COLORS: string[] = [
    'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
    'aqua', 'blue', 'navy', 'black', 'gray'
  ];
const NAMES: string[] = [
    'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
    'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Artur', 'Mia', 'Thomas', 'Elizabeth', 'Andrei', 'Diogo'
  ];
const FOODTYPE: string[] = [
    'tradicional', 'sushi', 'fastfood', 'pizza', 'healthy', 'desserts'
  ];
const AREA: string[] = [
    'Lisboa', 'Oeiras', 'Porto', 'Maia', 'Montijo', 'Campo Grande', 'Odivelas', 'Campo de Ourique', 'Restelo', 'Cacém', 'Alfornelos'
  ];
const FOODNAME: string[] = [
    'pizza', 'caldo verde', 'cheesecake', 'lasanha', 'cozido à portuguesa', 'linguini', 'bife wellington', 'ramen noodles', 'bacalhau',
    'bitoque', 'tiramisu', 'wurst', 'bolo de bolacha', 'seitan', 'sushi'
  ];
