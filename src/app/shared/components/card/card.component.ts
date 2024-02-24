import { CurrencyPipe } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  computed,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { DefaultImageUrl } from '../../../core/constants/default-image-url';
import { Product } from '../../../core/models/product';
import { DeleteButtonComponent } from '../delete-button/delete-button.component';
import { PricePipe } from '../../../core/pipes/price.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [PricePipe, DeleteButtonComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements AfterViewInit {
  // Constants
  public faTrash = faTrash;

  // View Children
  @ViewChild('image', { static: true }) image?: ElementRef<HTMLImageElement>;

  // Injections
  private router = inject(Router);

  // Inputs
  public product = input.required<Product>();

  // Computed Properties
  public id = computed(() => this.product().id);
  public name = computed(() => this.product().name);
  public description = computed(() => this.product().description);
  public price = computed(() => this.product().price);
  public imageUrl = computed(() => this.product().imageUrl || DefaultImageUrl);
  public routerLink = computed((): string => `/product/${this.product().id}`);

  // Lifecycle
  public ngAfterViewInit() {
    this.image!.nativeElement.onerror = () => {
      this.image!.nativeElement.src = DefaultImageUrl;
    };
  }

  // Public Methods
  public onCardClick(): void {
    this.router.navigate([this.routerLink()]);
  }
}
