import { Component, OnInit } from '@angular/core';
import { ApiService  } from "../../_services/api.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedFile: File;
  BselectedFile: string;
  imgUrl: string;
  currentUserLocal;
  firstName: string;
  lastName: string;
  birth: string;
  gender: string;
  address: string;
  district: string;
  county: string;
  nickname: string;
  email: string;

  constructor(private api: ApiService) {
    api.getAvatar().subscribe(res => {
      this.imgUrl = res.image;
      this.currentUserLocal = JSON.parse(localStorage.getItem('currentUser'))
      this.firstName = this.currentUserLocal.firstName;
      this.lastName = this.currentUserLocal.lastName;
      this.birth = this.currentUserLocal.birth;
      this.gender = this.currentUserLocal.gender;
      this.address = this.currentUserLocal.address;
      this.district = this.currentUserLocal.district;
      this.county = this.currentUserLocal.county;
      this.nickname = this.currentUserLocal.nickname;
      this.email = this.currentUserLocal.email;


    });
   }

  ngOnInit(): void {
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0];
  }
  onUpload() {
    /* uploadData continua empty apesar de darmos append a imagem até mesmo em base64
    const uploadData = new FormData();
    const reader = new FileReader();
    reader.onload = e => this.BselectedFile = reader.result.toString();
    reader.readAsDataURL(this.selectedFile);

    uploadData.append('image', this.BselectedFile)
    console.log(uploadData)
    this.api.upload(uploadData).subscribe( res => {
      console.log(res);
    });
    */
  }
}
