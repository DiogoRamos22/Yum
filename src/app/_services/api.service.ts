import { Injectable } from '@angular/core';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  config: AxiosRequestConfig = {
    baseURL: 'http://yum-app.online',
    timeout: 10000,
    responseType: 'json',
    validateStatus: (status: number) => status >= 200 && status < 300,
    maxRedirects: 5
  };

  handleResponse = (response: AxiosResponse) => response.data;

  handleError = (error: AxiosError) => error;

  loginUser(email: string, password: string) {
    return axios.post('/api/auth/login', { email, password}, this.config);
  }

  registerUser(data: JSON) {
    return axios.post('/api/auth/signup', data , this.config);
  }

  logoutUser() {
    const token = this.getToken();
    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.post('/api/auth/logout', {}, this.config);
  }

  meUser() {
    const token = this.getToken();
    if (token != null) {
      this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
      return axios.get('/api/auth/me', this.config);
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
    return axios.post('/api/updateAvatar', formData, this.config);
  }

  getAvatar() {
    const token = this.getToken();
    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.get('/api/avatar', this.config);
  }

  adminUser() {
    const token = this.getToken();
    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.get('/api/admin/isAdmin', this.config);
  }

  AllUser() {
    const token = this.getToken();
    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.get('/api/admin/GetAllUsers', this.config);
  }

  addDish(img, type, name, ingredients, numberOfDishes, date, price) {
    const token = this.getToken();
    const formData = new FormData();
    formData.append('img', img);
    formData.append('type', type);
    formData.append('name', name);
    formData.append('ingredients', ingredients);
    formData.append('number', numberOfDishes);
    formData.append('date', date);
    formData.append('price', price);
    this.config.headers = {
      'Content-Type': 'multipart/form-data',
      Authorization: 'Bearer ' + token
    };
    return axios.post('/api/addDish', formData, this.config);
  }

  getAllDishes() {
    const token = this.getToken();
    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.get('/api/getAllDishes', this.config);
  }

  getUserDishes(id) {
    const token = this.getToken();
    const formData = new FormData();
    formData.append('userId', id);

    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.post('/api/getUserDishes', formData, this.config);
  }

  GetAllHistory() {
    const token = this.getToken();
    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.get('/api/GetAllHistory', this.config);
  }
  GetHistoryCurrentUser() {
    const token = this.getToken();
    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.get('/api/getHistoryCurrentUser', this.config);
  }

  changeType(type) {
    const token = this.getToken();
    const formData = new FormData();
    formData.append('newType', type);
    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.post('/api/changeType', formData, this.config);
  }

  addMoney(value) {
    const token = this.getToken();
    const formData = new FormData();
    formData.append('money', value);
    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.post('/api/addMoney', formData, this.config);
  }

  buyDish(id, numberOfDishes, deliveryDate) {
    const token = this.getToken();
    const formData = new FormData();
    formData.append('dishId', id);
    formData.append('number', numberOfDishes);
    formData.append('dataEntrega', deliveryDate);

    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.post('/api/buyDish', formData, this.config);
  }

  editDish(newDate, id, amount) {
    const token = this.getToken();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('newData', newDate);
    formData.append('newNumber', amount);

    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.post('/api/editDish', formData, this.config);
  }

  rateVendor(idVendor, points) {
    const token = this.getToken();
    const formData = new FormData();

    formData.append('vendorId', idVendor.toString());
    formData.append('points', points.toString());

    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.post('/api/rateVendor', formData, this.config);
  }

  userInfo(userId) {
    const token = this.getToken();
    const formData = new FormData();
    formData.append('userId', userId);

    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.post('/api/userInfo', formData, this.config);
  }

  rateDish(id, rating) {
    const token = this.getToken();
    const formData = new FormData();
    formData.append('id', id);
    formData.append('points', rating);
    this.config.headers = {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token
    };
    return axios.post('/api/rateDish', formData, this.config);
  }


  getToken(): string {
    const currentUserLocal = JSON.parse(localStorage.getItem('currentUser'));
    return currentUserLocal.token;
  }
}
