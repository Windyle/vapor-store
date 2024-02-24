import { animate, style, transition, trigger } from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { ProductsService } from '../../products.service';
import { AddCardComponent } from '../../../../shared/components/add-card/add-card.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [CardComponent, RouterLink, ButtonComponent, AddCardComponent],
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

  // Lifecycle
  public ngOnInit(): void {
    this.productsService.loadProducts();
  }
}
