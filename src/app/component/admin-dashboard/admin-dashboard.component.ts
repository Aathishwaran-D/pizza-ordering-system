import { Component, OnInit } from '@angular/core';
import { Pizza } from '../../model/pizza';
import { Coupon } from '../../model/coupon';
import { PizzaService } from '../../services/pizza.service';
import { CouponService } from '../../services/coupon.service';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { MenubarModule } from 'primeng/menubar';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [PanelModule, TableModule,MenubarModule, CalendarModule,ButtonModule,CommonModule,DialogModule,  FormsModule,ReactiveFormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
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
    label:'Admin',
    routerLink:['/admin-dashboard']
    }
  ]
  pizzas: Pizza[] = [];

  coupons: Coupon[] = [];
  displayPizzaForm = false;
  displayCouponForm = false;
  selectedPizza: Pizza | undefined;
  selectedCoupon: Coupon | undefined;
  pizzaForm: FormGroup;
  couponForm: FormGroup;

  constructor(
    private pizzaService: PizzaService,
    private couponService: CouponService,
    private fb: FormBuilder
  ) {
    this.pizzaForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      category:['',Validators.required],
      size:['',Validators.required],
      cookingMethod:['',Validators.required],
      spiceLevel:['',Validators.required],
      imageUrl:['',Validators.required]
    });

    this.couponForm = this.fb.group({
      code: ['', Validators.required],
      discount: ['', Validators.required],
      expiryDate: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getPizzas();
    this.getCoupons();
  }

  getPizzas(): void {
    this.pizzaService.getPizzas()
      .subscribe(pizzas => this.pizzas = pizzas);
  }

  getCoupons(): void {
    this.couponService.getCoupon()
      .subscribe(coupons => this.coupons = coupons);
  }

  showPizzaForm(pizza?: Pizza): void {
    this.displayPizzaForm = true;
    this.selectedPizza = pizza;

    if (pizza) {
      this.pizzaForm.patchValue(pizza);
    } else {
      this.pizzaForm.reset();
    }
  }

  showCouponForm(coupon?: Coupon): void {
    this.displayCouponForm = true;
    this.selectedCoupon = coupon;

    if (coupon) {
      this.couponForm.patchValue(coupon);
    } else {
      this.couponForm.reset();
    }
  }

  hidePizzaForm(): void {
    this.displayPizzaForm = false;
    this.selectedPizza = undefined;
  }

  hideCouponForm(): void {
    this.displayCouponForm = false;
    this.selectedCoupon = undefined;
  }

  savePizza(): void {
    if (this.pizzaForm.valid) {
      const pizza = this.pizzaForm.value;

      if (this.selectedPizza) {
        this.pizzaService.updatePizza(this.selectedPizza.id, pizza)
          .subscribe(
            () => {
              this.getPizzas();
              this.hidePizzaForm();
            },
            error => {
              console.error('Error updating pizza:', error);
            }
          );
      } else {
        this.pizzaService.createPizza(pizza)
          .subscribe(
            () => {
              this.getPizzas();
              this.hidePizzaForm();
            },
            error => {
              console.error('Error creating pizza:', error);
            }
          );
      }
    }
  }

  saveCoupon(): void {
    if (this.couponForm.valid) {
      const coupon = this.couponForm.value;

      if (this.selectedCoupon) {
        this.couponService.updateCoupon(this.selectedCoupon.id, coupon)
          .subscribe(
            () => {
              this.getCoupons();
              this.hideCouponForm();
            },
            error => {
              console.error('Error updating coupon:', error);
            }
          );
      } else {
        this.couponService.createCoupon(coupon)
          .subscribe(
            () => {
              this.getCoupons();
              this.hideCouponForm();
            },
            error => {
              console.error('Error creating coupon:', error);
            }
          );
      }
    }
  }

  deletePizza(id: number): void {
    this.pizzaService.deletePizza(id)
      .subscribe(
        () => {
          this.getPizzas();
        },
        error => {
          console.error('Error deleting pizza:', error);
        }
      );
  }

  deleteCoupon(id: number): void {
    this.couponService.deleteCoupon(id)
      .subscribe(
        () => {
          this.getCoupons();
        },
        error => {
          console.error('Error deleting coupon:', error);
        }
      );
  }
  
}