import { NgClass } from '@angular/common';
import {
  HttpErrorResponse,
  HttpResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, catchError, of } from 'rxjs';
import { DefaultHttpResponse } from '../../../../core/models/default-http-response';
import { Product, ProductInput } from '../../../../core/models/product';
import { UrlValidatorFn } from '../../../../core/validators/url.validator';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { DeleteButtonComponent } from '../../../../shared/components/delete-button/delete-button.component';
import { ImagePreviewComponent } from '../../../../shared/components/image-preview/image-preview.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { AlertService } from '../../../../shared/services/alert/alert.service';
import { ProductsService } from '../../products.service';
import { AlertTypes } from '../../../../core/enums/alert-types';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    ImagePreviewComponent,
    DeleteButtonComponent,
    NgClass,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  // Public Properties
  public productForm: FormGroup | null = null;
  public id: number | null = null;

  // Private Properties
  private product: ProductInput | null = null;

  // Injections
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private alertService = inject(AlertService);
  private productsService = inject(ProductsService);

  // Subscriptions
  private paramMap$?: Subscription;

  // Lifecycle
  public ngOnInit(): void {
    this.paramMap$ = this.route.paramMap.subscribe({
      next: (params) => {
        if (params.get('id') && isNaN(Number(params.get('id')))) {
          this.alertService.showAlert('Invalid product ID', AlertTypes.Danger);
          this.router.navigate(['/products']);
          return;
        }

        this.id = params.get('id') ? Number(params.get('id') as string) : null;

        if (this.id) {
          this.getProduct(this.id);
        } else {
          this.product = this.productsService.getNewProductInput();
          this.generateForm(this.product);
        }
      },
    });
  }

  public ngOnDestroy(): void {
    this.paramMap$?.unsubscribe();
  }

  // Private Methods
  private getProduct(id: number): void {
    this.productsService
      .getProduct(id)
      .pipe()
      .subscribe({
        next: (response: HttpResponse<DefaultHttpResponse<Product | null>>) => {
          if (
            response.body?.data &&
            response.body?.statusCode === HttpStatusCode.Ok
          ) {
            this.product = response.body?.data as ProductInput;
            this.id = (response.body?.data as Product).id;
            this.generateForm(this.product);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error(error);
          this.alertService.showAlert(
            error.error?.message || 'There was an error loading the product',
            'danger',
          );

          this.router.navigate(['/products']);
        },
      });
  }

  private generateForm(productInput: ProductInput): void {
    this.productForm = this.formBuilder.group({
      name: [productInput.name, Validators.required],
      description: [productInput.description],
      price: [productInput.price, [Validators.required, Validators.min(0)]],
      imageUrl: [productInput.imageUrl, UrlValidatorFn],
    });
  }

  // Public Methods
  public onSave(): void {
    if (this.productForm) {
      // Update form validity to show errors if any
      for (const control of Object.keys(this.productForm.controls)) {
        this.productForm.controls[control].updateValueAndValidity();
      }

      // Check if form is valid and show alert if not
      if (!this.productForm.valid) {
        this.alertService.showAlert(
          'Please fill in all required fields',
          'danger',
        );
        return;
      }

      // Build product input to send to the server
      const productInput: ProductInput = {
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
        imageUrl: this.productForm.value.imageUrl,
      };

      if (this.id) {
        // If id exists, update the product
        this.productsService.updateProduct(productInput, this.id).subscribe({
          next: (
            response: HttpResponse<DefaultHttpResponse<Product | null>>,
          ) => {
            if (
              response.body &&
              response.body.statusCode === HttpStatusCode.Ok
            ) {
              this.alertService.showAlert(
                'Product updated successfully',
                'success',
              );

              this.router.navigate(['/products']);
            } else {
              this.alertService.showAlert(
                'There was an error updating the product',
                'danger',
              );
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
            this.alertService.showAlert(
              error.error?.message || 'There was an error updating the product',
              'danger',
            );
          },
        });
      } else {
        // If id does not exist, create the product
        this.productsService.createProduct(productInput).subscribe({
          next: (
            response: HttpResponse<DefaultHttpResponse<Product | null>>,
          ) => {
            if (
              response.body &&
              response.body.statusCode === HttpStatusCode.Created
            ) {
              this.alertService.showAlert(
                'Product created successfully',
                'success',
              );

              this.router.navigate(['/products']);
            } else {
              this.alertService.showAlert(
                'There was an error creating the product',
                'danger',
              );
            }
          },
          error: (error: HttpErrorResponse) => {
            console.error(error);
            this.alertService.showAlert(
              error.error?.message || 'There was an error creating the product',
              'danger',
            );
          },
        });
      }
    }
  }
}
