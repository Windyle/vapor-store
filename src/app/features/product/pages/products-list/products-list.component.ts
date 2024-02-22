import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ProductsService } from '../../products.service';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CardComponent, RouterLink],
  providers: [ProductsService],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  // Services
  productsService = inject(ProductsService);

  // Lifecycle
  ngOnInit(): void {
    this.productsService.loadProducts();
  }
}
