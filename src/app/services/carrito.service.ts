import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';
import { environments } from '../../environments/envinronments.prod';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private apiUrl = `${environments.backCarrito}/api/cart`; // Replace with your API URL

  constructor(private http: HttpClient) { }

  addProductsToCart(products: Product[], username: string): Observable<string> {
    const url = `${this.apiUrl}/add`;
    
    return this.http.post<string>(url, products , {params:{"username": username}  });
  }

  removeProductFromCart(productId: string, username: string): Observable<string> {
    const url = `${this.apiUrl}/remove/${productId}`;
    
    return this.http.delete<string>(url, { params: {"username": username } });
  }

  getCartContents(username: string): Observable<Product[]> {
    const url = `${this.apiUrl}/contents`;
    
    return this.http.get<Product[]>(url, {  params: { username } });
  }

  calculateTotal(username: string): Observable<string> {
    const url = `${this.apiUrl}/total`;
    
    return this.http.get<string>(url, {  params: { username } });
  }
}