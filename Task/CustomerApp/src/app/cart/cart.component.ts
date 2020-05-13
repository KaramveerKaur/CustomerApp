import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../shared/messenger.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items;
  constructor(private _messengerlService: MessengerService) { }

  ngOnInit() {
    // this._messengerlService.getMessage().subscribe(item =>{
    //   this.items = item;
    //   console.log("cartcomponenet===="+item);
    // });
    //console.log("cartcomponenet===="+this._messengerlService.getMessage());
    this.items = this._messengerlService.getMessage();
    console.log("cartcomponenet===="+this.items);
  }

}
