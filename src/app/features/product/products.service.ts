import { Injectable, inject, signal } from '@angular/core';
import { Product } from '../../core/models/product';
import { StorageService } from '../../shared/services/storage.service';

@Injectable()
export class ProductsService {
  // Properties

  private defaultProducts: Product[] = [
    {
      id: '1',
      name: 'Product 1',
      description: 'Description for product 1',
      price: 100,
    },
    {
      id: '2',
      name: 'Product 2',
      description: 'Description for product 2',
      price: 200,
    },
    {
      id: '3',
      name: 'Product 3',
      description: 'Description for product 3',
      price: 300,
    },
  ];

  products = signal<Product[]>(this.defaultProducts);

  // Services
  private storageService = inject(StorageService);

  constructor() {}

  loadProducts(): void {
    const productsString: string | null =
      this.storageService.getItem('products');

    if (productsString) {
      this.products.set(JSON.parse(productsString));
    }
  }

  getProduct(id: string): Product | null {
    return this.products().find((product) => product.id === id) || null;
  }

  createProduct(product: Product): boolean {
    try {
      this.products.update((products) => {
        return [...products, product];
      });

      this.storageService.setItem('products', this.products());

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

      this.storageService.setItem('products', this.products());

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  deleteProduct(id: string): boolean {
    try {
      this.products.update((products) => {
        return [...products.filter((product) => product.id !== id)];
      });

      this.storageService.setItem('products', this.products());

      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
