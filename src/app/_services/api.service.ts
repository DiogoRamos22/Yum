import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig,
  AxiosResponse,
  AxiosError } from 'axios';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  LARAVEL_PHP_API_SERVER = 'http://yum-app.online'

  config: AxiosRequestConfig = {
    baseURL: 'http://yum-app.online/',
    timeout: 10000,
    responseType: 'json',
    validateStatus: (status: number) => status >= 200 && status < 300,
    maxRedirects: 5
  };

  handleResponse = (response: AxiosResponse) => response.data;

  handleError = (error: AxiosError) => error;

  loginUser(email: string, password: string) {
    return axios.post('/api/auth/login', { email, password}, this.config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  registerUser(data: JSON) {
    return axios.post('/api/auth/signup', data , this.config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  logoutUser() {
    const token = this.getToken();
    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.post('/api/auth/logout', {}, this.config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  meUser() {
    const token = this.getToken();
    if (token != null) {
      this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
      return axios.get('/api/auth/me', this.config)
        .then(this.handleResponse)
        .catch(this.handleError);
    }
  }

  uploadAvatar(avatar) {
    const token = this.getToken();
    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.post('/api/updateAvatar', { avatar }, this.config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getAvatar() {
    const token = this.getToken();
    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.get('/api/avatar', this.config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  adminUser() {
    const token = this.getToken();
    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.get('/api/admin/isAdmin', this.config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  AllUser() {
    const token = this.getToken();
    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.get('/api/admin/GetAllUsers', this.config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getToken(): string {
    const currentUserLocal = JSON.parse(localStorage.getItem('currentUser'));
    return currentUserLocal.token;
  }
}
