import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import(
        './features/product/pages/products-list/products-list.component'
      ).then((c) => c.ProductsListComponent),
  },
  {
    path: 'product',
    loadComponent: () =>
      import(
        './features/product/pages/product-detail/product-detail.component'
      ).then((c) => c.ProductDetailComponent),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import(
        './features/product/pages/product-detail/product-detail.component'
      ).then((c) => c.ProductDetailComponent),
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
];
