import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  ViewContainerRef,
  inject,
  input,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { ModalService } from '../../services/modal/modal.service';
import { Subscription } from 'rxjs';
import { ProductsService } from '../../../features/product/products.service';

@Component({
  selector: 'app-card-delete-button',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './card-delete-button.component.html',
  styleUrl: './card-delete-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardDeleteButtonComponent implements OnDestroy {
  // Properties
  icon = input.required<IconProp>();
  productId = input.required<number>();
  productName = input.required<string>();

  // Services
  modalService = inject(ModalService);
  productsService = inject(ProductsService);

  // Subscriptions
  modalEvent$?: Subscription;
  deleteProduct$?: Subscription;

  // Lifecycle
  ngOnDestroy(): void {
    this.modalEvent$?.unsubscribe();
    this.deleteProduct$?.unsubscribe();
  }

  // Methods
  onClick(e: Event): void {
    e.stopPropagation();

    if (this.modalEvent$) {
      this.modalEvent$.unsubscribe();
    }

    this.modalEvent$ = this.modalService.modalEvent$.subscribe((confirmed) => {
      if (confirmed) {
        this.deleteProduct();
      }
    });

    this.modalService.showModal(
      'Delete Product',
      `Are you sure you want to delete this product?<br/><b>${this.productName()}</b>`,
      {
        text: 'Delete',
        color: 'danger',
      }
    );
  }

  private deleteProduct(): void {
    this.deleteProduct$ = this.productsService
      .deleteProduct(this.productId())
      .subscribe((response) => {
        if (response.statusCode === 200) {
          this.productsService.loadProducts();
        }
      });
  }
}
