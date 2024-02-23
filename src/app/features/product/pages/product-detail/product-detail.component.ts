import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, catchError, of } from 'rxjs';
import { Product, ProductInput } from '../../../../core/models/product';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ImagePreviewComponent } from '../../../../shared/components/image-preview/image-preview.component';
import { InputComponent } from '../../../../shared/components/input/input.component';
import { ProductsService } from '../../products.service';
import { DefaultHttpResponse } from '../../../../core/models/default-http-response';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputComponent,
    ButtonComponent,
    ImagePreviewComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  // Properties
  product: ProductInput | null = null;
  id: number | null = null;

  productForm: FormGroup | null = null;

  // Injections
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private productsService = inject(ProductsService);

  // Subscriptions
  private paramMap$?: Subscription;
  private product$?: Subscription;

  // Lifecycle
  ngOnInit(): void {
    this.paramMap$ = this.route.paramMap.subscribe((params) => {
      this.id = params.get('id') ? Number(params.get('id') as string) : null;

      if (this.id) {
        this.getProduct(this.id);
      } else {
        this.product = this.productsService.getNewProductInput();
        this.generateForm(this.product);
      }
    });
  }

  ngOnDestroy(): void {
    this.paramMap$?.unsubscribe();
    this.product$?.unsubscribe();
  }

  // Methods
  getProduct(id: number): void {
    this.product$ = this.productsService
      .getProduct(id)
      .pipe(
        catchError((error) => {
          console.error(error);
          this.router.navigate(['/products']);
          return of(null);
        })
      )
      .subscribe(
        (productResponse: DefaultHttpResponse<Product | null> | null) => {
          if (productResponse && productResponse.statusCode === 200) {
            this.product = productResponse.data as ProductInput;
            this.id = (productResponse.data as Product).id;
            this.generateForm(this.product);
          } else {
            this.router.navigate(['/products']);
          }
        }
      );
  }

  generateForm(productInput: ProductInput): void {
    this.productForm = this.formBuilder.group({
      name: [productInput.name, Validators.required],
      description: [productInput.description],
      price: [productInput.price, Validators.required],
      imageUrl: [productInput.imageUrl],
    });
  }

  onSave(): void {
    if (this.productForm) {
      for (const control of Object.keys(this.productForm.controls)) {
        this.productForm.controls[control].updateValueAndValidity();
      }

      if (!this.productForm.valid) {
        //TODO - Alert user that the form is invalid
        return;
      }

      const productInput: ProductInput = {
        name: this.productForm.value.name,
        description: this.productForm.value.description,
        price: this.productForm.value.price,
        imageUrl: this.productForm.value.imageUrl,
      };

      if (this.id) {
        this.productsService
          .updateProduct(productInput, this.id)
          .subscribe((response) => {
            if (response.statusCode === 200) {
              this.router.navigate(['/products']);
            } else {
              //TODO - Alert user that the product was not updated
            }
          });
      } else {
        this.productsService
          .createProduct(productInput)
          .subscribe((response) => {
            if (response.statusCode === 201) {
              this.router.navigate(['/products']);
            } else {
              //TODO - Alert user that the product was not created
            }
          });
      }
    }
  }
}
