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
  @Input({ required: true }) set control(value: AbstractControl | null) {
    if (value) {
      this.formControl = value as FormControl;
      this.required = this.formControl.hasValidator(Validators.required);

      this.validity$ = this.formControl.statusChanges.subscribe(() => {
        console.log('status changed');
        if (this.formControl) this.invalid = this.formControl.invalid;
      });
      return;
    }

    this.formControl = null;
  }

  formControl: FormControl | null = null;

  label = input.required<string>();
  type = input.required<'text' | 'number'>();

  name = computed(() => this.label().toLowerCase().replace(' ', '-'));

  required: boolean = false;
  invalid: boolean = false;

  // Subscriptions
  private validity$?: Subscription;

  // Lifecycle
  ngOnDestroy(): void {
    this.validity$?.unsubscribe();
  }
}
