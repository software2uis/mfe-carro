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
  cartItems: any[] = [];

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

  ngOnInit(): void {
    const savedCart = localStorage.getItem('cartItems');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
    }
  }

  private updateLocalStorage(): void {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  increaseQuantity(item: any) {
    item.quantity++;
    this.updateLocalStorage();
  }

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
      this.updateLocalStorage();
    }
  }

  addToWishlist(item: any) {
    console.log(`Añadido a la lista de deseos: ${item.name}`);
  }

  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
    this.updateLocalStorage();
  }

  calculateSubtotal() {
    return this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  addToCart(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.name === item.name);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem = { ...item, quantity: 1 };
      this.cartItems.push(newItem);
    }
    
    this.updateLocalStorage();
    console.log(`Producto añadido al carrito: ${item.name}`);
 
  // Ver el contenido del carrito
  console.log("Contenido del localStorage:", localStorage.getItem('cartItems'));


  }

}
