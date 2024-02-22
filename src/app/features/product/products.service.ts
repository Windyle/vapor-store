import { Injectable, inject, signal } from '@angular/core';
import { Product, ProductInput } from '../../core/models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ProductsService {
  // Consts
  private readonly API_HOST = 'http://localhost:3000';

  // Properties
  products = signal<Product[]>([]);

  // Services
  http = inject(HttpClient);

  constructor() {}

  loadProducts(): void {
    this.http
      .get<Product[]>(`${this.API_HOST}/product`)
      .subscribe((products) => {
        this.products.set(products);

        console.log(this.products());
      });
  }

  getProduct(id: number): Observable<Product | null> {
    return this.http.get<Product | null>(`${this.API_HOST}/product/${id}`);
  }

  createProduct(product: Product): boolean {
    try {
      this.products.update((products) => {
        return [...products, product];
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  updateProduct(product: Product): boolean {
    try {
      this.products.update((products) => {
        const index = products.findIndex((p) => p.id === product.id);
        products[index] = product;
        return [...products];
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  deleteProduct(id: number): boolean {
    try {
      this.products.update((products) => {
        return [...products.filter((product) => product.id !== id)];
      });

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  getNewProductInput(): ProductInput {
    return {
      name: '',
      description: '',
      price: 0,
      imageUrl: null,
    };
  }
}
