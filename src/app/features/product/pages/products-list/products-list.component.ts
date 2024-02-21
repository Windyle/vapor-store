import { Component, inject } from '@angular/core';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [],
  providers: [ProductsService],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
})
export class ProductsListComponent {
  productsService = inject(ProductsService);
}
