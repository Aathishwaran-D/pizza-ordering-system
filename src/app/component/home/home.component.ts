import { Component } from '@angular/core';
import { Pizza } from '../../model/pizza';
import { PizzaService } from '../../services/pizza.service';
import { Router } from '@angular/router';
// import { MessageModule } from 'primeng/message/message';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { InputNumberModule } from 'primeng/inputnumber';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule,CardModule,MenubarModule,InputNumberModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/']
    },
    {
      label: 'Cart',
      icon: 'pi pi-fw pi-shopping-cart',
      routerLink: ['/cart']
    },
    {
      label: 'User Login',
      icon: 'pi pi-fw pi-user',
      routerLink: ['/login']
    }
  ]
  pizzaQuantityControl = new FormControl(0); // Initialize FormControl
  pizzas: Pizza[] = [];

  constructor(private pizzaService: PizzaService, private router: Router) { }

  ngOnInit(): void {
    this.loadPizzas();
  }

  loadPizzas() {
    this.pizzaService.getPizzas().subscribe(
      (data) => this.pizzas = data,
      (error) => console.log('Error fetching pizzas', error)
    );
  }

  incrementQuantity(pizza: Pizza) {
    pizza.quantity = (pizza.quantity || 0) + 1; // Ensure quantity starts from 1
  }

  // Decrement the quantity for the selected pizza
  decrementQuantity(pizza: Pizza) {
    if (pizza.quantity && pizza.quantity > 1) {
      pizza.quantity--;
    }
  }

  selectedPizzas: { pizza: Pizza, quantity: number }[] = [];

  orderPizzas() {
      // Process the selected pizzas and quantities
      console.log(this.selectedPizzas);
      // Navigate to cart or process the order
  }

  
}
