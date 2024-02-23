import { Injectable, inject, signal } from '@angular/core';
import { Product, ProductInput } from '../../core/models/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DefaultHttpResponse } from '../../core/models/default-http-response';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Consts
  private readonly API_HOST = 'http://localhost:3000';

  // Properties
  products = signal<Product[]>([]);

  // Services
  http = inject(HttpClient);

  // Methods

  // GET - /product
  loadProducts(): void {
    this.http
      .get<DefaultHttpResponse<Product[]>>(`${this.API_HOST}/product`)
      .subscribe((productsResponse: DefaultHttpResponse<Product[]>) => {
        if (productsResponse.statusCode === 200) {
          this.products.set(productsResponse.data);
        }
      });
  }

  // GET - /product/:id
  getProduct(id: number): Observable<DefaultHttpResponse<Product | null>> {
    return this.http.get<DefaultHttpResponse<Product | null>>(
      `${this.API_HOST}/product/${id}`
    );
  }

  // POST - /product
  createProduct(
    product: ProductInput
  ): Observable<DefaultHttpResponse<Product | null>> {
    return this.http.post<DefaultHttpResponse<Product | null>>(
      `${this.API_HOST}/product`,
      product
    );
  }

  // PUT - /product/:id
  updateProduct(
    product: ProductInput,
    id: number
  ): Observable<DefaultHttpResponse<Product | null>> {
    return this.http.put<DefaultHttpResponse<Product | null>>(
      `${this.API_HOST}/product/${id}`,
      product
    );
  }

  // DELETE - /product/:id
  deleteProduct(id: number): Observable<DefaultHttpResponse<Product>> {
    return this.http.delete<DefaultHttpResponse<Product>>(
      `${this.API_HOST}/product/${id}`
    );
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
