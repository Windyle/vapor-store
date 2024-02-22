import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { CardActionButtonComponent } from '../card-action-button/card-action-button.component';
import { Product } from '../../../core/models/product';
import { DefaultImageUrl } from '../../../core/constants/DefaultImageUrl';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, CardActionButtonComponent, RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  // Consts
  faTrash = faTrash;

  // Properties
  product = input.required<Product>();

  name = computed(() => this.product().name);
  description = computed(() => this.product().description);
  price = computed(() => this.product().price);
  imageUrl = computed(() => this.product().imageUrl || DefaultImageUrl);

  routerLink = computed((): string => `/product/${this.product().id}`);
}
