import { Routes } from '@angular/router';
import { RegistrationComponent } from './component/registration/registration.component';
import { LoginComponent } from './component/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';

// import { CartComponent } from './component/cart/cart.component';

export const routes: Routes = [  
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'cart', component: CartComponent   },
    { path: 'admin-dashboard', component: AdminDashboardComponent } ,
    // { path: '', redirectTo: '/login', pathMatch: 'full' }
    { path: 'home', component: HomeComponent },
    {path: '', component:LoginComponent}
    // { path: 'cart', component: CartComponent }, // Cart page route

];
