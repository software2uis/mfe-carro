import { Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component'; // Asegúrate de que la ruta sea correcta

// Exporta las rutas
export const routes: Routes = [
  { path: 'carrito', component: CarritoComponent }, // Ruta para el carrito
  { path: '', redirectTo: 'carrito', pathMatch: 'full' }, // Redirige al carrito al cargar la aplicación
];


