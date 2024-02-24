import { NgClass } from '@angular/common';
import { Component, Input, OnDestroy, computed, input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent implements OnDestroy {
  // Inputs
  @Input({ required: true }) set control(value: AbstractControl | null) {
    if (value) {
      this.formControl = value as FormControl;
      this.required = this.formControl.hasValidator(Validators.required);

      // Subscribe to the form control's status changes to update the error key and error params
      this.validity$ = this.formControl.statusChanges.subscribe({
        next: () => {
          if (this.formControl) {
            this.errorKey =
              Object.keys(this.formControl.errors || [])[0] || null;

            if (this.errorKey) {
              this.errorParams = this.formControl.getError(this.errorKey) || {};
            }
          }
        },
      });
      return;
    }

    this.formControl = null;
  }

  public label = input.required<string>();
  public type = input.required<'text' | 'number'>();

  // Public Properties
  public formControl: FormControl | null = null;
  public required: boolean = false;
  public errorKey: string | null = null;
  public errorParams: { [key: string]: string } = {};

  // Computed Properties
  name = computed(() => this.label().toLowerCase().replace(' ', '-'));

  // Subscriptions
  private validity$?: Subscription;

  // Lifecycle
  ngOnDestroy(): void {
    this.validity$?.unsubscribe();
  }
}
