import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { MessageModule } from 'primeng/message';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [MessageModule, ReactiveFormsModule, CommonModule, ButtonModule, InputTextModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LoginComponent implements OnInit {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  loginForm!: FormGroup;

  // Inject FormBuilder instead of FormGroup
  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    // FormBuilder to create the form
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

 onSubmit(): void {
    if (this.loginForm.valid) {
      this.userService.login(this.loginForm.value).subscribe(
        response => {
          if (response && response.token) {

            const roles = localStorage.getItem('roles') || '';
            console.log(roles)
            if (roles.includes('ROLE_ADMIN')) {
              this.router.navigate(['/admin-dashboard']);
            }else{
              this.router.navigate(['/home']);
            }
            // Store the token in localStorage
            localStorage.setItem('jwtToken', response.token);
            sessionStorage.setItem('userName', this.loginForm.controls['username'].value);
            localStorage.setItem('id',response.id)
            console.log('Login successful, token stored');
            // Redirect to home or dashboard page
          }
        },
        error => {
          // Handle login error, display an error message
          this.errorMessage = 'Invalid credentials, please try again.';
          console.error('Login error:', error);
        }
      );
    } else {
      this.errorMessage = 'Please fill in all required fields.';
    }
  }

  navigateToRegister(): void {
    this.router.navigate(['/register']);
  }



//   this.router.navigate(['/cart'], {
//     queryParams: { selectedPizzas: JSON.stringify(this.selectedPizzas), totalPrice: this.calculateTotalPrice() }
// });

}
