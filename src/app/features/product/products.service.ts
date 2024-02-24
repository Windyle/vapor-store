import { Injectable, inject, signal } from '@angular/core';
import { Product, ProductInput } from '../../core/models/product';
import {
  HttpClient,
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { DefaultHttpResponse } from '../../core/models/default-http-response';
import { AlertService } from '../../shared/services/alert/alert.service';
import { AlertTypes } from '../../core/enums/alert-types';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Consts
  private readonly API_HOST = 'http://localhost:3000';

  // Properties
  products = signal<Product[]>([]);

  // Injections
  alertService = inject(AlertService);
  http = inject(HttpClient);

  // Methods

  // GET - /product
  loadProducts(): void {
    this.http
      .get<DefaultHttpResponse<Product[]>>(`${this.API_HOST}/product`, {
        observe: 'response',
      })
      .subscribe({
        next: (response: HttpResponse<DefaultHttpResponse<Product[]>>) => {
          if (response.body && response.body.statusCode === HttpStatusCode.Ok) {
            this.products.set(response.body.data);
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error(err.message);
          this.alertService.showAlert(
            err.error?.message || 'Failed to load products',
            AlertTypes.Danger,
          );
        },
      });
  }

  // GET - /product/:id
  getProduct(
    id: number,
  ): Observable<HttpResponse<DefaultHttpResponse<Product | null>>> {
    return this.http.get<DefaultHttpResponse<Product | null>>(
      `${this.API_HOST}/product/${id}`,
      {
        observe: 'response',
      },
    );
  }

  // POST - /product
  createProduct(
    product: ProductInput,
  ): Observable<HttpResponse<DefaultHttpResponse<Product | null>>> {
    return this.http.post<DefaultHttpResponse<Product | null>>(
      `${this.API_HOST}/product`,
      product,
      {
        observe: 'response',
      },
    );
  }

  // PUT - /product/:id
  updateProduct(
    product: ProductInput,
    id: number,
  ): Observable<HttpResponse<DefaultHttpResponse<Product | null>>> {
    return this.http.put<DefaultHttpResponse<Product | null>>(
      `${this.API_HOST}/product/${id}`,
      product,
      {
        observe: 'response',
      },
    );
  }

  // DELETE - /product/:id
  deleteProduct(
    id: number,
  ): Observable<HttpResponse<DefaultHttpResponse<Product>>> {
    return this.http.delete<DefaultHttpResponse<Product>>(
      `${this.API_HOST}/product/${id}`,
      {
        observe: 'response',
      },
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
