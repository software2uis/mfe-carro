import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-carrito',
  standalone: true,
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  imports: [CommonModule, FormsModule],
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

  activateCustomQuantity(item: any) {
    item.customQuantityActive = true;
    item.customQuantity = item.quantity; 
  }
  
  onCustomQuantityChange(item: any) {
    if (item.customQuantity < 1) {
      item.customQuantity = 1; // Asegurarse de que la cantidad sea válida
    }
    if (item.customQuantity > 100) {
      item.customQuantity = 100; // Limitar la cantidad máxima
    }
    item.quantity = item.customQuantity; 
    this.updateLocalStorage();
  }
  
  updateCustomQuantity(item: any) {
    // Asegurarnos de que la cantidad ingresada sea válida (entre 1 y 100)
    if (item.customQuantity < 1) {
      item.customQuantity = 1; // Asegurarse de que la cantidad mínima sea 1
    }
    if (item.customQuantity > 100) {
      item.customQuantity = 100; // Limitar la cantidad máxima a 100
    }
  
    // Si el valor ingresado es entre 1 y 9, se vuelve a mostrar la lista
    if (item.customQuantity >= 1 && item.customQuantity <= 9) {
      item.quantity = item.customQuantity; // Se guarda el valor de la cantidad
      item.isCustomQuantity = false; // Ocultar el campo personalizado y mostrar la lista
    } else {
      item.quantity = item.customQuantity; // Guardar el valor personalizado
      item.isCustomQuantity = true; // Mantener el campo personalizado visible
    }
  
    this.updateLocalStorage(); // Guarda la nueva cantidad en el almacenamiento local
  }
  
  
  onQuantityChange(item: any) {
    if (item.quantity === 'custom') {
      item.isCustomQuantity = true; // Mostrar el campo personalizado si se selecciona "custom"
    } else {
      item.isCustomQuantity = false; // Mostrar la lista si se elige una cantidad normal
    }
  }  
    
  addToWishlist(item: any) {
    console.log(`Añadido a la lista de deseos: ${item.name}`);
  }

  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
    this.updateLocalStorage();
    alert(`Producto eliminado del carrito: ${item.name}`);
  }  

  calculateSubtotal() {
    return this.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
  
  calculateItemCount() {
    return this.cartItems.reduce((total, item) => {
      return total + Number(item.quantity);
    }, 0);
  }
  
  addToCart(item: any) {
    const existingItem = this.cartItems.find(cartItem => cartItem.name === item.name);
    
    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem = { ...item, quantity: 1 };
      this.cartItems.push(newItem);
    }
  }
  
  applyDiscount() {
    alert("No hay códigos de descuentos disponibles actualmente.");
  }

  calculateTax() {
    return this.calculateSubtotal() * 0.19;
  }

  calculateTotal() {
    return this.calculateSubtotal() + this.calculateTax();
  }
}
