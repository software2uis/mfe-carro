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
      quantity: 1,
      price: 50000.0
    },
    {
      name: 'Camisa',
      imageUrl: 'assets/img/Camisa.png',
      description: 'Una camisa cómoda de algodón de alta calidad.',
      quantity: 1,
      price: 80000.0
    }
  ];

  suggestions = [
    {
      name: 'Play Station 5',
      imageUrl: 'assets/img/PS5.jpg',
      price: 3000000.0
    },
    {
      name: 'Monitor 40"',
      imageUrl: 'assets/img/monitor.jpg',
      price: 1500000.0
    }
    // Añade más productos sugeridos aquí
  ];

  constructor() { }

  ngOnInit(): void {}

  increaseQuantity(item: any) {
    item.quantity++;
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  addToWishlist(item: any) {
    console.log(`Añadido a la lista de deseos: ${item.name}`);
  }

  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
  }

  calculateSubtotal() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  addToCart(item: any) {
    console.log(`Producto añadido al carrito: ${item.name}`);
    // Aquí puedes agregar lógica para añadir a carrito
  }
}
