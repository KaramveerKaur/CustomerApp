import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../shared/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit,OnDestroy {

  signInForm: FormGroup;
  submitted = false;

  error: boolean = false;
  errorMessage: String = "";
  //dataLoading: boolean = false;
  private querySubscription;


  constructor(private _customerService: CustomerService, private _route: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.signInForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.signInForm.controls; }

  onSubmit() {
    this.submitted = true;
  
    // stop here if form is invalid
    if (this.signInForm.invalid) {
        return;
    }else{
  
      this.querySubscription = this._customerService.signIn(this.signInForm.value).subscribe((res) => {
          //console.log(res);    
        if (res["errorCode"] > 0) {
                  this.error = false;
                  this.errorMessage = "";
                  window.localStorage.setItem('token', res["data"].token);
                  this._route.navigate(['/customer']);
              } else {
                  this.error = true;
                  this.errorMessage =res["errorMessage"];
              }
          });
  
      
    }
  
    // display form values on success
    
  }
  ngOnDestroy(){
    // if (this.querySubscription) {
    //   this.querySubscription.unsubscribe();
    // }
  }

}
