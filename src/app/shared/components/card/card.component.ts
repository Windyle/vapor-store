import { CurrencyPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DefaultImageUrl } from '../../../core/constants/DefaultImageUrl';
import { Product } from '../../../core/models/product';
import { CardDeleteButtonComponent } from '../card-delete-button/card-delete-button.component';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CurrencyPipe, CardDeleteButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  // Consts
  faTrash = faTrash;

  // Services
  router = inject(Router);

  // Properties
  product = input.required<Product>();

  // Computed
  id = computed(() => this.product().id);
  name = computed(() => this.product().name);
  description = computed(() => this.product().description);
  price = computed(() => this.product().price);
  imageUrl = computed(() => this.product().imageUrl || DefaultImageUrl);

  routerLink = computed((): string => `/product/${this.product().id}`);

  // Methods
  onCardClick(): void {
    this.router.navigate([this.routerLink()]);
  }
}
