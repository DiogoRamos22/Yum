import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [SnackBarComponent],
})
export class ProfileComponent implements OnInit {
  selectedFile: File;
  BselectedFile: string;
  imgUrl: string;
  currentUserLocal: string;
  firstName: string;
  lastName: string;
  birth: string;
  gender: string;
  address: string;
  district: string;
  county: string;
  nickname: string;
  email: string;
  card: string;
  isNotClient = false;

  constructor(
    private api: ApiService,
    private snackBar: SnackBarComponent,
    private router: Router,
    private auth: AuthenticationService
  ) {
    if (!this.auth.currentUserValue) {
      this.router.navigate(['/']);
    } else {
      this.snackBar.openSnackBar(
        'Loading profile',
        'Dismiss',
        2000
      );
      api
        .getAvatar()
        .then((res) => {
          this.imgUrl = res.data.image;
          api.meUser().then((Ures) => {
            Ures.data.token = this.auth.currentUserValue.token;
            localStorage.removeItem('currentUser');
            localStorage.setItem('currentUser', JSON.stringify(Ures.data));
            auth.currentUserUpdate(Ures.data);
            this.card = auth.currentUserValue.card;

            if (Ures.data.type !== 'Client') {
              this.isNotClient = true;
            }
          });
        })
        .catch((err) => {
          this.snackBar.openSnackBar(
            'Error while loading profile',
            'Dismiss',
            2000
          );
          this.auth.logout();
          this.router.navigate(['/login']);
        });
    }
  }

  ngOnInit(): void {
    this.currentUserLocal = this.auth.currentUserValue.type;
    this.firstName = this.auth.currentUserValue.firstName;
    this.lastName = this.auth.currentUserValue.lastName;
    this.birth = this.auth.currentUserValue.birth;
    this.gender = this.auth.currentUserValue.gender;
    this.address = this.auth.currentUserValue.address;
    this.district = this.auth.currentUserValue.district;
    this.county = this.auth.currentUserValue.county;
    this.nickname = this.auth.currentUserValue.nickname;
    this.email = this.auth.currentUserValue.email;
    this.card = this.auth.currentUserValue.card;
  }
  updateMoney($event) {
    this.card = $event;
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.snackBar.openSnackBar(
      'Image selected successfully',
      'Dismiss',
      2000
    );
  }

  update() {
    if (this.selectedFile) {
      this.api
        .uploadAvatar(this.selectedFile)
        .then((res) => {
          console.log(res);
          this.api
            .getAvatar()
            .then((Ares) => {
              this.snackBar.openSnackBar(
                'Image updated successfully',
                'Dismiss',
                2000
              );
              this.imgUrl = Ares.data.image;
            })
            .catch((err) => {
              this.snackBar.openSnackBar(
                'Error',
                'Dismiss',
                2000
              );
            });
        })
        .catch((err) => {
          this.snackBar.openSnackBar(
            'Something went wrong... Try again',
            'Dismiss',
            2000
          );
        });
    }
  }
}
