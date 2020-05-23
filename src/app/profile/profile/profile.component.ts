import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../_services/api.service';
import { SnackBarComponent } from '../../snack-bar/snack-bar.component';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/_services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [SnackBarComponent]
})
export class ProfileComponent implements OnInit {
  currentUserLocal;
  selectedFile: File;
  BselectedFile: string;
  imgUrl: string;
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

  constructor(private api: ApiService, private snackBar: SnackBarComponent, private router: Router, private auth: AuthenticationService) {
    this.snackBar.openSnackBar('Loading profile', 'Dismiss', 2000);
    api.getAvatar()
      .then(res => {
        this.imgUrl = res.data.image;
        this.currentUserLocal = JSON.parse(localStorage.getItem('currentUser'));
        this.firstName = this.currentUserLocal.firstName;
        this.lastName = this.currentUserLocal.lastName;
        this.birth = this.currentUserLocal.birth;
        this.gender = this.currentUserLocal.gender;
        this.address = this.currentUserLocal.address;
        this.district = this.currentUserLocal.district;
        this.county = this.currentUserLocal.county;
        this.nickname = this.currentUserLocal.nickname;
        this.email = this.currentUserLocal.email;
        this.card = this.currentUserLocal.card;

        if (this.currentUserLocal.type !== 'Client') {
          this.isNotClient = true;
        }

      })
      .catch(err => {
        this.snackBar.openSnackBar('Error while loading profile', 'Dismiss', 2000);
        this.auth.logout();
        this.router.navigate(['/login']);
      });
  }

  ngOnInit(): void {
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.snackBar.openSnackBar('Image selected successfully', 'Dismiss', 2000);
  }

  update() {
    if (this.selectedFile) {
      this.api.uploadAvatar(this.selectedFile)
        .then(res => {
          console.log(res);
          this.api.getAvatar()
            .then( res => {
              this.snackBar.openSnackBar('Image updated successfully', 'Dismiss', 2000);
              this.imgUrl = res.data.image;
            })
            .catch(err => {
              this.snackBar.openSnackBar('Error', 'Dismiss', 2000);
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
}
