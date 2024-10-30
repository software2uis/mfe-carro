import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  standalone: true,
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  imports: [CommonModule],
})
export class CarritoComponent implements OnInit {
  cartItems = [
    {
      name: 'Carro F1',
      imageUrl: 'assets/img/F1carro.jpeg',  
      description: 'Un carro de carreras de Fórmula 1 en madera',
      quantity: 1
    },
    {
      name: 'Camisa',
      imageUrl: 'assets/img/Camisa.png',   
      description: 'Una camisa cómoda de algodón de alta calidad.',
      quantity: 1
    }
  ];

  constructor() { }

  ngOnInit(): void {
    
  }

  increaseQuantity(item: any) {
    item.quantity++;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  addToWishlist(item: any) {
    // Lógica para añadir a la lista de deseos
    console.log(`Añadido a la lista de deseos: ${item.name}`);
  }

  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
  }
}
