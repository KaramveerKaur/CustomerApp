import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FrontendService {

  constructor(private _http: HttpClient) { }
  getBodyData(){
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : "abcd";  
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this._http.get("http://localhost:3000/getBodyData", httpOptions);
  }
  getMenuCategory(){
    let token = localStorage.getItem('token') ? localStorage.getItem('token') : "abcd";  
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token': token }) };
    return this._http.get("http://localhost:3000/getMenuCategory", httpOptions);
  }
}
