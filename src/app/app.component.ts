import { HttpClientModule } from '@angular/common/http';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './component/user/user.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { MessageModule } from 'primeng/message';    
import { LoginComponent } from './component/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PizzaService } from './services/pizza.service';
import { HomeComponent } from './component/home/home.component';
import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { OrderHistoryComponent } from './component/orderhistory/orderhistory.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MessageModule,ReactiveFormsModule,HttpClientModule,
    TableModule,DialogModule,ButtonModule,InputTextModule,FormsModule,AdminDashboardComponent,
            CardModule,
            UserComponent,
            RegistrationComponent,
            MenubarModule,
            LoginComponent,
            OrderHistoryComponent,
            HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angular17';
}
