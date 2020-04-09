import { Injectable } from '@angular/core';

import { Customer } from './customer.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
	
	selectedCustomer: Customer = {
		fullName: '',
		emailId: '',
		password: ''
  };
  

  constructor(private _http: HttpClient) { }


  createUser(formData){
    //console.log("formdata===="+formData);
  //	let token = localStorage.getItem('token') ? localStorage.getItem('token') : "abcd";
  let token = localStorage.getItem('token') ? localStorage.getItem('token') : "abcd"; 
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
  	return this._http.post("http://localhost:3000/signup", formData, httpOptions);
  }
  signIn(formData){
    //console.log("formdata===="+formData);
  //	let token = localStorage.getItem('token') ? localStorage.getItem('token') : "abcd";
  let token = localStorage.getItem('token') ? localStorage.getItem('token') : "abcd";  
  let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
  	return this._http.post("http://localhost:3000/signin", formData, httpOptions);
  }
  getUserClaims(){
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : "abcd";  
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this._http.get("http://localhost:3000/getUser", httpOptions);
    
  }
  updateUser(formData){
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : "abcd";  
    let httpOptions = { headers: new HttpHeaders({ "Accept": "application/json", 'token': token }) };
  	return this._http.post<any>("http://localhost:3000/updateUser", formData, httpOptions);
  }
}
