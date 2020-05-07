import { Component, OnInit, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';
import { FrontendService } from '../shared/frontend.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit {
  private querySubscription;
  docData: any = {};
  error: boolean = false;
  errorMessage: String = "";
  success: boolean = false;
  successMessage: String = "";

  constructor(private _route: Router,private _frontendService: FrontendService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.getData();
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
}

