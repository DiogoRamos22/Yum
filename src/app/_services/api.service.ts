import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  LARAVEL_PHP_API_SERVER = 'http://127.0.0.1:8000/'

  config: AxiosRequestConfig = {
    baseURL: 'http://127.0.0.1:8000/',
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
    const formData = new FormData();
    formData.append('avatar', avatar);
    this.config.headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token
    };
    return axios.post('/api/updateAvatar', formData, this.config)
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

  addDish(img, type, name, ingredients, number, date, price) {
    const token = this.getToken();
    const formData = new FormData();
    formData.append('img', img);
    formData.append('type', type);
    formData.append('name', name);
    formData.append('ingredients', ingredients);
    formData.append('number', number);
    formData.append('date', date);
    formData.append('price', price);
    this.config.headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token
    };
    return axios.post('/api/addDish', formData, this.config)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

}
