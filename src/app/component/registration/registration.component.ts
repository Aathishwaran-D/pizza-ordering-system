import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { MessageModule } from 'primeng/message';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-registration',
  standalone: true,
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
  imports: [MessageModule, ReactiveFormsModule, CommonModule, ButtonModule, FormsModule]
})
export class RegistrationComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      phoneNumber: ['', Validators.pattern('^[0-9]{10}$')],
      password: ['', [Validators.required, Validators.minLength(6)]],
      roles: ['']
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      this.userService.register(this.registrationForm.value).subscribe(
        response=> {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error => {
          this.router.navigate(['/login']);
          console.error('Registration error', error);
        }
      );
    }
  }
}