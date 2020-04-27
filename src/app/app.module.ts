// modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { routingComponents, AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule} from '@angular/material/tabs';
// components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home/home.component';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { SearchComponent } from './home/search/search.component';
import { FoodtypeComponent } from './home/foodtype/foodtype.component';
import { FooterComponent } from './home/footer/footer.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register.component';
import { LoggedInComponent } from './home/logged-in/logged-in.component';
import { LoggedOutComponent } from './home/logged-out/logged-out.component';
import { FoodtableComponent } from './food/foodtable/foodtable.component';
import { FoodComponent } from './food/food/food.component';
import { ProfileComponent } from './profile/profile/profile.component';
import { AdminComponent } from './admin/admin/admin.component';
import { AdminUsersComponent } from './admin/admin-users/admin-users.component';
import { AdminFoodComponent } from './admin/admin-food/admin-food.component';
import { SnackBarComponent } from './snack-bar/snack-bar.component';
import { MyFoodComponent } from './my-food/my-food.component';
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatChipsModule } from "@angular/material/chips";

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    HomeComponent,
    LoginComponent,
    FoodtypeComponent,
    FooterComponent,
    LoggedInComponent,
    LoggedOutComponent,
    NavBarComponent,
    SearchComponent,
    RegisterComponent,
    ProfileComponent,
    routingComponents,
    FoodtableComponent,
    SnackBarComponent,
    FoodComponent,
    AdminUsersComponent,
    AdminFoodComponent,
    MyFoodComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatTabsModule

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
