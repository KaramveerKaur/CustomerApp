import { Component, OnInit } from '@angular/core';
import { MessengerService } from '../shared/messenger.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items = [];
  constructor(private _messengerlService: MessengerService) { }
  cartSubTotal = 0;
  delCharge = 15;
  totalTax = 0;
  taxPer = 0.05;
  cartTotal = 0;
  ngOnInit() {
    // this._messengerlService.getMessage().subscribe(item =>{
    //   this.items = item;
    //   console.log("cartcomponenet===="+item);
    // });
    //console.log("cartcomponenet===="+this._messengerlService.getMessage());
    this.items = this._messengerlService.getMessage();
    console.log("cartcomponenet===="+this.items);
    this.refreshCart(this.items);
  }
  handleUpdateCart(Id,Qty){
    for (var i in this.items){
      if(this.items[i].Id === Id){
        this.items[i].Qty = Qty;
      }
        // console.log("updatecName---"+this.items[i].ItemName);
        // console.log("updatecQty---"+this.items[i].Qty);
        // console.log("updatecId---"+this.items[i].Id);
    }
    this.refreshCart(this.items);
  }
  refreshCart(data){
    this.cartSubTotal = 0;
    this.cartTotal = 0;
    this.totalTax = 0;
    data.forEach(element => {
      this.cartSubTotal += (element.Price * element.Qty)
    });
    if(this.cartSubTotal > 200){
      this.delCharge = 0;
      this.totalTax = this.cartSubTotal * this.taxPer;
      this.cartTotal = this.cartSubTotal + this.totalTax;
    }else{
      var taxSub = this.cartSubTotal + this.delCharge;
      this.totalTax = taxSub * this.taxPer;
      this.cartTotal = taxSub + this.totalTax;
    }
  }
  placeOrder(){
    
  }

}
