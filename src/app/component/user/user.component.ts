import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user',
  standalone:true,
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  welcomeMessage: string = '';  // Variable to store the welcome message

  constructor(private userService: UserService) { }

  ngOnInit() {
    // Call the method with the different name in Angular (getWelcomeMessage)
    this.userService.getWelcomeMessage().subscribe(
      (data: string) => {
        this.welcomeMessage = data;  // Store the welcome message from Spring Boot
      },
      (error: any) => {
        console.error('Error fetching welcome message:', error);
      }
    );
  }
}
