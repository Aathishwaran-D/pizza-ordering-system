import { Component } from '@angular/core';
import { Pizza } from '../../model/pizza';
import { PizzaService } from '../../services/pizza.service';
import { Router, RouterLink } from '@angular/router';
// import { MessageModule } from 'primeng/message/message';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, getLocaleNumberFormat } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { MenubarModule } from 'primeng/menubar';
import { InputNumberModule } from 'primeng/inputnumber';
import { ActivatedRoute } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { last } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, ButtonModule,CardModule,MenubarModule,InputNumberModule,FormsModule,TabMenuModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  items = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: ['/home']
    },
    {
      label: 'Cart',
      icon: 'pi pi-fw pi-shopping-cart',
      routerLink: ['/cart']
    },
    {
      label:  sessionStorage.getItem('userName') || 'Guest',
      icon: 'pi pi-fw pi-user',
      routerLink: ['/login']
    },
    {
      label:'Order',
      command:()=> this.orderPizzas()
    },
    {
    label:'Admin',
    routerLink:['/admin-dashboard']
    },
    {
      label:'History',

    },
    {
     'label':'Logout',
     icon: 'pi pi-fw pi-sign-out',
      command: () => this.logout(),
      cssClass: 'logout-item' // Add a custom class here
      
    }


  ]

  // pizzaQuantityControl = new FormControl(0); // Initialize FormControl
  pizzas: Pizza[] = [];
  selectedPizzas: {
    price: number; pizza: Pizza, quantity: number}[] = [];

  constructor(private route: ActivatedRoute, private pizzaService: PizzaService, private router: Router) { }
  ngOnInit() {
    this.loadPizzas();  
  }

  loadPizzas() {
    this.pizzaService.getPizzas().subscribe(
      (data) => this.pizzas = data,
      (error) => console.log('Error fetching pizzas', error)
    );
  }

//   updateQuantity(pizza: Pizza, event: any) {
//     const quantity = event.value;
//     const existingPizza = this.selectedPizzas.find((selectedPizza) => selectedPizza.pizza.id === pizza.id);
//     if (existingPizza) {
//         existingPizza.quantity = quantity;
//     } else {
//         this.selectedPizzas.push({
//           pizza, quantity,
//           price: pizza.price
//         });
//     }

//     console.log(pizza.name, 'updateQuantity');

// }

  // calculateTotalPrice(): number {
  //   let totalPrice = 0;
  //   this.selectedPizzas.forEach((selectedPizza) => {
  //     totalPrice += selectedPizza.pizza.price * selectedPizza.quantity;
  //   });
  //   console.log(totalPrice);
  //   return totalPrice;
  
  // }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    this.selectedPizzas.forEach((selectedPizza) => {
        totalPrice += selectedPizza.price * selectedPizza.quantity;
    });
    console.log(totalPrice, 'calculateTotalPrice');
    return totalPrice;
}
// OrderPlace To Call the cart meThod
orderPlaced: boolean = false; 
  orderPizzas() {
    this.selectedPizzas = this.pizzas.filter(pizza => pizza.quantity > 0).map(pizza => ({
        pizza,
        quantity: pizza.quantity,
        price: pizza.price
    }));
    this.orderPlaced = true;
    console.log(this.selectedPizzas);

    // Navigate to cart page, passing selected pizzas and total price
    this.router.navigate(['/cart'], {
        queryParams: { selectedPizzas: JSON.stringify(this.selectedPizzas), totalPrice: this.calculateTotalPrice() }
    });
}
logout(){
  console.log("Logging out")
  sessionStorage.clear(); // Clear session storage
  localStorage.clear(); // Clear local storage
  this.router.navigate(['/login']); // Redirect to login page
}
}