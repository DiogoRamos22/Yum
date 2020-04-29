import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/_services/api.service';

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

  constructor(private route: ActivatedRoute, private api: ApiService) { }

  ngOnInit(): void {
    this.route.params.subscribe( params => {
      this.userId = params.userId;
      this.api.userInfo(this.userId)
        .then( res => {
          this.imgUrl = res.data.image;
          this.firstName = res.data.firstName;
          this.lastName = res.data.lastName;
          this.birth = res.data.birth;
          this.gender = res.data.gender;
          this.district = res.data.district;
          this.email = res.data.email;
        })
        .catch( err => {
          console.log(err);
        })
  });
  }

}
