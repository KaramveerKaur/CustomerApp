import { Routes } from '@angular/router';

//componenet
import { CustomerComponent } from './customer/customer.component';
import { RegisterComponent } from './customer/register/register.component';
import { SigninComponent } from './customer/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';

//import { FooterComponent } from './footer/footer.component';
//import { BodyComponent } from './body/body.component';

//services
import { AuthGuardService } from './shared/auth-guard.service';

export const appRoutes : Routes = [
{
	path:'register' , component: RegisterComponent,
	//children: [{path: '', component: RegisterComponent }]
},
{ path:'' , redirectTo: '/register',pathMatch: 'full'},
{ path: 'signin', component: SigninComponent },
{ path: 'thechilika', component: HeaderComponent },
{ path: 'menu', component: MenuComponent },
{ path: 'customer', component: CustomerComponent,canActivate: [AuthGuardService]}

];
