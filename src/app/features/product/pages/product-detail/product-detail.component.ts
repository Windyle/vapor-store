import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, catchError, of } from 'rxjs';
import { ProductInput } from '../../../../core/models/product';
import { ProductsService } from '../../products.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { DefaultImageUrl } from '../../../../core/constants/DefaultImageUrl';
import { InputComponent } from '../../../../shared/components/input/input.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [ReactiveFormsModule, InputComponent],
  providers: [ProductsService],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  // Consts
  readonly defaultImageUrl = DefaultImageUrl;

  // Properties
  product: ProductInput | null = null;
  id: number | null = null;

  productForm: FormGroup | null = null;

  // Injections
  private formBuilder = inject(FormBuilder);
  private route = inject(ActivatedRoute);
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
        catchError((error: unknown): Observable<ProductInput> => {
          console.error(error);
          this.product = null;
          return of(this.productsService.getNewProductInput());
        })
      )
      .subscribe((product) => {
        if (product) {
          this.product = product;
          this.generateForm(product);
        }
      });
  }

  generateForm(productInput: ProductInput): void {
    this.productForm = this.formBuilder.group({
      name: [productInput.name],
      description: [productInput.description],
      price: [productInput.price],
      imageUrl: [productInput.imageUrl],
    });
  }
}
