import { Injectable, ReflectiveInjector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  LARAVEL_PHP_API_SERVER = 'http://f3baf686.ngrok.io';

  loginUser(user: string) {
    return this.httpClient.post<any>(`${this.LARAVEL_PHP_API_SERVER}/api/auth/login?` + user, {});
  }

  registerUser(user: string): Observable<any> {
    return this.httpClient.post<any>(`${this.LARAVEL_PHP_API_SERVER}/api/auth/signup?` + user, {});
  }

  upload(uploadData) {
    const token = this.getToken();
    console.log(uploadData)
    return this.httpClient.post(`${this.LARAVEL_PHP_API_SERVER}/api/updateAvatar`, {avatar: uploadData}, {headers: token});
  }

  logoutUser() {
    const token = this.getToken();
    return this.httpClient.post<any>(`${this.LARAVEL_PHP_API_SERVER}/api/auth/logout`, {}, {headers: token});
  }

  meUser(): Observable<any> {
    const token = this.getToken();
    if (token != null) {
      return this.httpClient.get<any>(`${this.LARAVEL_PHP_API_SERVER}/api/auth/me`, {headers: token});
    }
  }
  getAvatar(): Observable<any> {
    const token = this.getToken();
    return this.httpClient.get<any>(`${this.LARAVEL_PHP_API_SERVER}/api/avatar`, {headers: token})
  }

  adminUser(): Observable<any> {
    const token = this.getToken();
    return this.httpClient.get<any>(`${this.LARAVEL_PHP_API_SERVER}/api/admin/isAdmin`, { headers: token });
  }

  AllUser(): Observable<any> {
    const token = this.getToken();
    return this.httpClient.get(`${this.LARAVEL_PHP_API_SERVER}/api/admin/GetAllUsers`, {headers: token});
  }

  constructor(private httpClient: HttpClient) { }
  getToken(): HttpHeaders {
    const currentUserLocal = JSON.parse(localStorage.getItem('currentUser'));
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + currentUserLocal.token
   });

    return reqHeader;
  }
}
