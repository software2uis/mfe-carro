import { Component, Inject, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CarritoService } from '../services/carrito.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CarritoComponent implements OnInit {
  carritoService = inject(CarritoService);
  cartItems: any[] = []; // Lista de productos en el carrito
  router = inject(Router);
  suggestions: any[] = [
    {
      name: 'Play Station 5',
      imageUrl: 'assets/img/PS5.jpg',
      price: 3000000.0,
    },
    {
      name: 'Monitor 40"',
      imageUrl: 'assets/img/monitor.jpg',
      price: 1500000.0,
    },
  ];
  user: string  | null = null;

  ngOnInit(): void {
    // Cargar productos desde localStorage al iniciar el componente
    this.user = localStorage.getItem('username');

    if(this.user){
      this.carritoService.getCartContents(this.user).subscribe((products) =>{

          products.filter((product) => product.idMongo !== null).forEach((product) => {
            this.cartItems.push(product);
          }) 
          const savedCart = localStorage.getItem('cartItems');
          if (savedCart) {
            console.log('Productos cargados desde localStorage al iniciar:', this.cartItems);
            const cartItems = JSON.parse(savedCart);
            this.carritoService.addProductsToCart( cartItems, this.user!).subscribe()
            this.cartItems.push(...cartItems);
            localStorage.removeItem('cartItems');

          } else {
            console.log('No se encontraron productos en localStorage.');
        }
      })
    }else{
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        this.cartItems = JSON.parse(savedCart);
        console.log('Productos cargados desde localStorage al iniciar:', this.cartItems);
      } else {
        console.log('No se encontraron productos en localStorage.');
      }
    }
    // Escuchar el evento de "addToCart" emitido por el catálogo
    window.addEventListener('addToCart', (event: Event) => {
      const customEvent = event as CustomEvent;
      console.log(customEvent.detail.cart);
      this.addToCart(customEvent.detail.cart);
    });
  }

  private updateLocalStorage(): void {
    // Actualizar el almacenamiento local con los productos en el carrito
    console.log('Actualizando localStorage con:', this.cartItems);
    if(this.user){
      this.carritoService.addProductsToCart( this.cartItems, this.user).subscribe()
    }else{
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  }

  addToCart(product: any): void {
    console.log('Producto recibido para agregar al carrito:', product);

    // Verificar si el producto ya existe en el carrito
    const existingItem = this.cartItems.find(item => item.idMongo === product.idMongo);
    if (existingItem) {
      existingItem.quantity += product.quantity || 1; // Incrementar la cantidad existente
    } else {
      this.cartItems.push({ ...product, quantity: product.quantity || 1 }); // Agregar nuevo producto
    }

    this.updateLocalStorage(); // Guardar los cambios en localStorage
    console.log('Estado actualizado del carrito:', this.cartItems);
  }

  calculateSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  calculateItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  removeFromCart(item: any): void {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
    if(this.user){
      this.carritoService.removeProductFromCart(item.idMongo, this.user).subscribe()
    }else{
      this.updateLocalStorage();

    }
    alert(`Producto eliminado del carrito: ${item.name}`);
  }

  updateCustomQuantity(item: any): void {
    if (item.customQuantity < 1) {
      item.customQuantity = 1;
    }
    if (item.customQuantity > 100) {
      item.customQuantity = 100;
    }

    item.quantity = item.customQuantity;
    item.isCustomQuantity = false;
    this.updateLocalStorage();
  }

  onQuantityChange(item: any): void {
    if (item.quantity === 'custom') {
      item.isCustomQuantity = true;
    } else {
      item.isCustomQuantity = false;
      this.updateLocalStorage();
    }
  }
  checkoutOrder(){
    if(this.user){
        alert(`El total de la compra es de: $${this.calculateSubtotal()}`);
    }else{
      this.router.navigate(['/login']);
    }
  }
}
