import { Injectable } from '@angular/core';
//import  { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessengerService {

  //subject = new Subject();
  items = [];
  constructor() { }
  sendMessage(data) {
    console.log("dataget====="+data);
    this.items.push(data);
    //this.subject.next(data);
  }
  getMessage() {
    return this.items;
    //return this.subject.asObservable();
  }
}
