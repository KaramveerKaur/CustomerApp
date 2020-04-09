import { Component, OnInit,OnDestroy ,ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../shared/customer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, OnDestroy {
  updateUserForm: FormGroup;
  submitted = false;
  error: boolean = false;
  errorMessage: String = "";
  success: boolean = false;
  successMessage: String = "";
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  private querySubscription;
  docData: any = {};

  constructor(private _route: Router,private _customerService: CustomerService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.updateUserForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      emailId: ['', [Validators.required, Validators.email]],
      gender: ['', [Validators.required]],
      orgName: ['', [Validators.required]],
      profilePic: [''],
      fileSource:[''],
      imageInput:null
  });
  this.getData();


  }
  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    this.preview();
    
  }

preview() {
  // Show preview 
  var mimeType = this.fileData.type;
  if (mimeType.match(/image\/*/) == null) {
    return;
  }

  var reader = new FileReader();      
  reader.readAsDataURL(this.fileData); 
  reader.onload = (_event) => { 
    this.previewUrl = reader.result; 
  }
  const file = this.fileData;
  console.log(file);
  this.updateUserForm.patchValue({
    fileSource: file
  });
  this.updateUserForm.controls['imageInput'].setValue(file ? file.name : ''); 

  //const formupdata = this.updateUserForm.value;
  //console.log("formupdata________"+formupdata.fileSource.name);
}
  
  get f() { return this.updateUserForm.controls; }
  getData(){
    this.querySubscription = this._customerService.getUserClaims().subscribe((res) => {
      if (res["errorCode"] > 0) {
          this.error = false;
          this.errorMessage = "";
          this.docData = res["data"];
          this.previewUrl = "http://localhost:3000/resources/"+res["data"].profilePic;
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

  onSubmit(){
    this.submitted = true;
  
    // stop here if form is invalid
    if (this.updateUserForm.invalid) {
        return;
    }else{
      const formData = new FormData();
      formData.append( "fullName", this.updateUserForm.value.fullName);
      formData.append( "emailId", this.updateUserForm.value.emailId);
      formData.append( "gender", this.updateUserForm.value.gender);
      formData.append( "orgName", this.updateUserForm.value.orgName);
      formData.append( "profilePic", this.updateUserForm.value.profilePic);
      formData.append( "file", this.updateUserForm.value.fileSource);
		
      console.log("filePic______"+this.updateUserForm.value.profilePic);
      //console.log("profilePic______"+this.updateUserForm.value.profilePic);      
      this.querySubscription = this._customerService.updateUser(formData).subscribe((res) => {
        if (res["errorCode"] > 0) {
            this.error = false;
            this.errorMessage = "";
            this.success = true;
            this.successMessage = res["successMessage"];
            //this.docData = res["data"];
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
     
  Logout() {
    localStorage.removeItem('token');
    this._route.navigate(['/signin']);
  }
  ngOnDestroy() {
    if (this.querySubscription) {
      this.querySubscription.unsubscribe();
    }

  }

}
