import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../shared/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from '../../_helpers/match.validator';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [CustomerService]
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  submitted = false;


  error: boolean = false;
  success: boolean = false;
  errorMessage: String = "";
  successMessage: String = "";  
  //dataLoading: boolean = false;
  private querySubscription;
  //savedChanges: boolean = false;

  constructor(private _customerService: CustomerService, private _route: Router,private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.registerForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      gender: ['', Validators.required],
      orgName: ['', Validators.required]
  }, {
      validator: MustMatch('password', 'confirmPassword')
  });

  }

  get f() { return this.registerForm.controls; }

//   createUser(formData){
//     this.querySubscription = this._customerService.createUser(formData).subscribe((res) => {
//       if (res["errorCode"] > 0) {
//           this.error = false;
//           this.errorMessage = "";
//       } else {
//           this.error = true;
//           this.errorMessage =res["errorMessage"];
//       }
//   },
//       (error) => {
//           this.error = true;
//           this.errorMessage = error.message;
//           //this.dataLoading = false;
//       }
//       );
// }


onSubmit() {
  this.submitted = true;

  // stop here if form is invalid
  if (this.registerForm.invalid) {
      return;
  }else{

    this.querySubscription = this._customerService.createUser(this.registerForm.value).subscribe((res) => {
            if (res["errorCode"] > 0) {
                this.error = false;
                this.errorMessage = "";
                this.success = true;
                this.successMessage = res["successMessage"];
                //alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
            } else {
                this.error = true;
                this.errorMessage =res["errorMessage"];
            }
        });

    
  }

  // display form values on success
  
}

  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }

  }
  

}
