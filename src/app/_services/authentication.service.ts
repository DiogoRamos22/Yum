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
      // tslint:disable-next-line: prefer-const
      let promise = new Promise((resolve, reject) =>{
        return this.http.post<any>(`http://f3baf686.ngrok.io/api/auth/login?email=${email}&password=${password}`, {  })
          .toPromise().then(
            res => {
              const reqHeader = new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + res.token
             });
              this.http.get<any>(`http://f3baf686.ngrok.io/api/auth/me`, {headers: reqHeader}).toPromise().then(
                user => {
                  user.token = res.token;
                  if (user && user.token) {
                      // store user details and jwt token in local storage to keep user logged in between page refreshes
                      localStorage.setItem('currentUser', JSON.stringify(user));
                      this.currentUserSubject.next(user);
                      this.results = user;
                  }
                  resolve(this.results);
                  return user;
                }
              );
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
        let promise = new Promise((resolve, reject) => {
          // tslint:disable-next-line: max-line-length
          const registerInfo = `type=${type}&firstName=${firstName}&lastName=${lastName}&birth=${birth}&gender=${gender}&address=${address}&district=${district}&county=${county}&nickname=${nickname}&email=${email}&password=${password}`;
          return this.userApi.registerUser(registerInfo).toPromise().then(res => {
            resolve(res)
          })
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
