import { Routes } from '@angular/router';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
// import { CartComponent } from './component/cart/cart.component';

export const routes: Routes = [  
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    // { path: '', redirectTo: '/login', pathMatch: 'full' }
    { path: '', component: HomeComponent },
    // { path: 'cart', component: CartComponent }, // Cart page route

];
