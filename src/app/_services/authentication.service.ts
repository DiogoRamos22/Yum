import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, pipe } from 'rxjs';
import { User } from '../_models/user';
import { ApiService } from '../_services/api.service';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    results: object[];
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient, private userApi: ApiService) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }
    login(email: string, password: string) {
      let promise = new Promise(( resolve, reject ) => {
        this.userApi.loginUser(email, password)
          .then( res => {
            localStorage.setItem('currentUser', JSON.stringify(res));
            this.userApi.meUser()
              .then( user => {
                user.token = res.token;
                if (user && user.token) {
                  localStorage.removeItem('currentUser');
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  this.currentUserSubject.next(user);
                  this.results = user;
                  resolve(this.results);
                  return user;
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
