import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';
import { MatDialog } from '@angular/material/dialog';
import { UserRateDialogComponent} from '../user-rate-dialog/user-rate-dialog.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userId: string;
  imgUrl: any;
  firstName: any;
  lastName: any;
  currentUserLocal: any;
  birth: any;
  gender: any;
  address: any;
  district: any;
  county: any;
  nickname: any;
  email: any;
  card: any;
  rating: any;

  constructor(private route: ActivatedRoute, private api: ApiService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.userId = params.userId;
      this.api.userInfo(this.userId)
        .then( res => {

          this.imgUrl = 'http://yum-app.online/uploads/' + res.data.avatar;
          this.firstName = res.data.firstName;
          this.lastName = res.data.lastName;
          this.nickname = res.data.nickname;
          this.birth = res.data.birth;
          this.gender = res.data.gender;
          this.district = res.data.district;
          this.email = res.data.email;
          this.userId = res.data.id;
        })
        .catch( err => {
          console.log(err);
        })
  });
  }
  rateVendor(vendorId) {
    const dialogRef = this.dialog.open(UserRateDialogComponent, {
      width: '350px',
      data: {
        rating: this.rating,
        vendorId
      }
    });
    dialogRef.afterClosed().subscribe( res => {
      console.log('Dialog Closed');
      this.rating = res;
    });
  }

}
