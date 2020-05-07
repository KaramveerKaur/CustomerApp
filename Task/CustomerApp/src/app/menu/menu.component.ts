import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FrontendService } from '../shared/frontend.service';
import { FormBuilder, } from '@angular/forms';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  private querySubscription;
  docData: any = {};
  docCat: any = {};
  error: boolean = false;
  errorMessage: String = "";
  success: boolean = false;
  successMessage: String = "";

  constructor(private _route: Router,private _frontendService: FrontendService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getData();
    this.getMenuCategory();
  }
  getData(){
    this.querySubscription = this._frontendService.getBodyData().subscribe((res) => {
      if (res["errorCode"] > 0) {
          this.error = false;
          this.errorMessage = "";
          this.docData = res["data"];
          //this.previewUrl = "http://localhost:3000/resources/"+res["data"].profilePic;
      } else {
          this.error = true;
          this.errorMessage = res["errorMessage"];
      }
    },
      (error) => {
          this.error = true;
          this.errorMessage = error.message;
      }
    );
  }
  getMenuCategory(){
    this.querySubscription = this._frontendService.getMenuCategory().subscribe((res) => {
      if (res["errorCode"] > 0) {
          this.error = false;
          this.errorMessage = "";
          this.docCat = res["data"];
          //this.previewUrl = "http://localhost:3000/resources/"+res["data"].profilePic;
      } else {
          this.error = true;
          this.errorMessage = res["errorMessage"];
      }
    },
      (error) => {
          this.error = true;
          this.errorMessage = error.message;
      }
    );
  }

}
