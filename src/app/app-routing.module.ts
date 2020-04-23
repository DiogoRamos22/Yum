import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { AdminComponent } from './admin/admin/admin.component';
import { Role } from './_models/role';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { HomeComponent } from './home/home/home.component';
import { FoodtableComponent } from './food/foodtable/foodtable.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard], data: {roles:[Role.Admin]}},
  {path: 'profile', component: ProfileComponent},
  {path: 'food', component: FoodtableComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, LoginComponent, RegisterComponent, AdminComponent, ProfileComponent, FoodtableComponent];
