import { Routes } from '@angular/router';

import { CustomerComponent } from './customer/customer.component';
import { RegisterComponent } from './customer/register/register.component';
import { SigninComponent } from './customer/signin/signin.component';
import { AuthGuardService } from './shared/auth-guard.service';

export const appRoutes : Routes = [
{
	path:'register' , component: RegisterComponent,
	//children: [{path: '', component: RegisterComponent }]
},
{ path:'' , redirectTo: '/register',pathMatch: 'full'},
{ path: 'signin', component: SigninComponent },
{ path: 'customer', component: CustomerComponent,canActivate: [AuthGuardService]}

];
