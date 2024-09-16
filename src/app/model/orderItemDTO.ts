import { PizzaDTO } from "./pizzaDTO";

export interface OrderItemDTO {
    quantity: number;
    price: number;
    pizza: PizzaDTO;
  }