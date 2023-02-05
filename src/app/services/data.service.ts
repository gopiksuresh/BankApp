import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

//Global http header object
const options = {
  headers: new HttpHeaders
}

@Injectable({
  providedIn: 'root'
})



export class DataService {

  currentUser: any;
  currentAcno: any;

  userDetails: any = {   // objects of objects
    1000: { acno: 1000, username: "Gopik", password: 1000, balance: 10000, transaction: [] },
    1001: { acno: 1001, username: "Anagha", password: 1001, balance: 12000, transaction: [] },
    1002: { acno: 1002, username: "Soja", password: 1002, balance: 8000, transaction: [] }
  }

  constructor(private http: HttpClient) {
  }

  //saveDetails() to store data in the localStorage
  saveDetails() {
    if (this.userDetails) {
      localStorage.setItem('dataBase', JSON.stringify(this.userDetails))
    }
    if (this.currentAcno) {
      localStorage.setItem('currentAcno', JSON.stringify(this.currentAcno))
    }
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser))
    }
  }


  //Register API Request
  register(acno: any, password: any, username: any) {

    const data = {
      acno,
      password,
      username
    }
    return this.http.post('http://localhost:3000/register', data)
  }

  login(acno: any, pswd: any) {
    const data = {
      acno,
      pswd
    }
    return this.http.post('http://localhost:3000/login', data)
  }

  getToken() {
    //Fetch token from localStorage
    const token = JSON.parse(localStorage.getItem('token') || '');

    //Generate request header
    let headers = new HttpHeaders;

    //Append token inside the headers
    if (token) {
      options.headers = headers.append('x-access-token', token)
    }
    return options
  }

  deposit(acno: any, pswd: any, amt: any) {
    const data = {
      acno,
      pswd,
      amt
    }
    return this.http.post('http://localhost:3000/deposit', data, this.getToken())
  }

  withdraw(acno: any, pswd: any, amt: any) {
    const data = {
      acno,
      pswd,
      amt
    }
    return this.http.post('http://localhost:3000/withdraw', data, this.getToken())
  }

  getTransaction(acno: any) {
    const data = {
      acno
    }
    return this.http.post('http://localhost:3000/transaction', data, this.getToken())
  }

}

