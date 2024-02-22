import { Component, Input, computed, input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
})
export class InputComponent {
  @Input() control: AbstractControl | null = null;

  label = input.required<string>();
  type = input.required<'text' | 'number'>();

  name = computed(() => this.label().toLowerCase().replace(' ', '-'));
  formControl = computed(() => this.control as FormControl);
}
