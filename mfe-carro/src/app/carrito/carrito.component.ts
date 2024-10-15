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
      name: 'Artículo 1',
      imageUrl: 'url_de_la_imagen_1', // Reemplazar con la URL real de la imagen
      quantity: 1
    },
    {
      name: 'Artículo 2',
      imageUrl: 'url_de_la_imagen_2', // Reemplazar con la URL real de la imagen
      quantity: 1
    }
    // Agregar más artículos 
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
