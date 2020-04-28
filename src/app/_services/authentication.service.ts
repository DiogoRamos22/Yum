import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { ApiService } from '../_services/api.service';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    results: object[];
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor( private userApi: ApiService ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    public currentUserUpdate(user) {
      this.currentUserSubject.next(user);
    }
    login(email: string, password: string) {
      // tslint:disable-next-line: prefer-const
      let promise = new Promise(( resolve, reject ) => {
        this.userApi.loginUser(email, password)
          .then( res => {
            localStorage.setItem('currentUser', JSON.stringify(res.data));
            this.userApi.meUser()
              .then( user => {
                user.data.token = res.data.token;
                if (user.data && user.data.token) {
                  localStorage.removeItem('currentUser');
                  localStorage.setItem('currentUser', JSON.stringify(user.data));
                  this.currentUserSubject.next(user.data);
                  this.results = user.data;
                  resolve(this.results);
                  return user.data;
                } else {
                  reject('Error.');
                }
              })
              .catch(err => {
                reject('Failed to retreive user info');
                console.log(err);
              });
          })
          .catch( err => {
            reject('Failed to Authenticate');
            console.log(err);
          });
      });
      return promise;

    }
    register(
      firstName: string,
      lastName: string,
      birth: string,
      gender: string,
      address: string,
      district: string,
      county: string,
      nickname: string,
      type: string,
      email: string,
      password: string
      ) {
        // tslint:disable-next-line: prefer-const
        let promise = new Promise(( resolve, reject ) => {
          const registerInfo: JSON = {
            firstName,
            lastName,
            birth,
            gender,
            address,
            district,
            county,
            nickname,
            type,
            email,
            password
          } as unknown as JSON;
          return this.userApi.registerUser(registerInfo)
            .then( res => {
              resolve(res);
            })
            .catch( err => {
              reject('Registration Failed');
            });
        });
        return promise;
      }

    logout() {
        // remove user from local storage to log user out
        // remeber to call logout
        this.userApi.logoutUser();
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
