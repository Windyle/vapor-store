import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
  input,
} from '@angular/core';
import { Router } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { Subscription } from 'rxjs';
import { AlertTypes } from '../../../core/enums/alert-types';
import { ProductsService } from '../../../features/product/products.service';
import { AlertService } from '../../services/alert/alert.service';
import { ModalService } from '../../services/modal/modal.service';
import { ButtonComponent } from '../button/button.component';
import { DefaultHttpResponse } from '../../../core/models/default-http-response';
import { Product } from '../../../core/models/product';
import { ButtonColors } from '../../../core/enums/button-colors';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [FontAwesomeModule, ButtonComponent],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeleteButtonComponent implements OnDestroy {
  // Inputs
  public icon = input<IconProp>();
  public text = input<string>();
  public size = input<'small' | 'medium' | 'large' | 'block'>('medium');
  public productId = input.required<number>();
  public productName = input.required<string>();

  // Injections
  private alertService = inject(AlertService);
  private modalService = inject(ModalService);
  private productsService = inject(ProductsService);
  private router = inject(Router);

  // Subscriptions
  private modalEvent$?: Subscription;

  // Lifecycle
  public ngOnDestroy(): void {
    this.modalEvent$?.unsubscribe();
  }

  // Public Methods
  public onClick(e: Event): void {
    e.stopPropagation();

    this.modalEvent$?.unsubscribe();

    // Confirm deletion modal
    this.modalEvent$ = this.modalService
      .showModal(
        'Delete Product',
        `Are you sure you want to delete this product?<br/><b>${this.productName()}</b>`,
        {
          text: 'Delete',
          color: ButtonColors.Danger,
        },
      )
      .subscribe({
        next: (confirmed: boolean) => {
          if (confirmed) {
            this.deleteProduct();
          }
        },
        error: () => {
          // Alert
          this.alertService.showAlert(
            `Error occured for the modal event for product "${this.productName()}"`,
            AlertTypes.Danger,
          );
        },
      });
  }

  // Private Methods
  private deleteProduct(): void {
    this.productsService.deleteProduct(this.productId()).subscribe({
      next: (response: HttpResponse<DefaultHttpResponse<Product>>) => {
        if (response.body && response.body.statusCode === HttpStatusCode.Ok) {
          // Reload products
          this.productsService.loadProducts();

          this.alertService.showAlert(
            `Product "${this.productName()}" deleted successfully`,
            AlertTypes.Success,
          );

          if (!this.router.url.includes('products')) {
            // Redirect to products page if not already there
            this.router.navigate(['/products']);
          }
        } else {
          // Alert
          this.alertService.showAlert(
            `Error deleting product "${this.productName()}"`,
            AlertTypes.Danger,
          );
        }
      },
      error: () => {
        // Alert
        this.alertService.showAlert(
          `Error deleting product "${this.productName()}"`,
          AlertTypes.Danger,
        );
      },
    });
  }
}
