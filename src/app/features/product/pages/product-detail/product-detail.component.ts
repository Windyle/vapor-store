import { Component } from '@angular/core';
import { ProductsService } from '../../products.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  providers: [ProductsService],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {}
