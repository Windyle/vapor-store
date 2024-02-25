import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ProductsService } from '../../products.service';
import { AddCardComponent } from '../../../../shared/components/add-card/add-card.component';
import { SearchComponent } from '../../../../shared/components/search/search.component';
import { SortService } from '../../../../shared/services/sort.service';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    CardComponent,
    RouterLink,
    ButtonComponent,
    AddCardComponent,
    SearchComponent,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0', transform: 'translateY(20px)' }),
        animate(
          '.5s {{time}}s ease-out',
          style({ opacity: '1', transform: 'translateY(0)' }),
        ),
      ]),
    ]),
  ],
})
export class ProductsListComponent implements OnInit {
  // Injections
  public productsService = inject(ProductsService);
  public sortService = inject(SortService);

  // Constructor
  constructor() {
    // Effect instead of computed property just for demonstration purposes
    effect(() => {
      switch (this.sortService.sortOption()) {
        case 'name_asc':
          return this.productsService
            .products()
            .sort((a, b) => a.name.localeCompare(b.name));
        case 'name_desc':
          return this.productsService
            .products()
            .sort((a, b) => b.name.localeCompare(a.name));
        case 'price_asc':
          return this.productsService
            .products()
            .sort((a, b) => a.price - b.price);
        case 'price_desc':
          return this.productsService
            .products()
            .sort((a, b) => b.price - a.price);
        default:
          return this.productsService.products();
      }
    });
  }

  // Lifecycle
  public ngOnInit(): void {
    this.productsService.loadProducts();
  }
}
