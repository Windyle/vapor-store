import { Component, Input, input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { SelectOption } from '../../../core/types/select-option';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
})
export class SelectComponent {
  // Inputs
  @Input({ required: true }) set control(value: AbstractControl | null) {
    if (value) {
      this.formControl = value as FormControl;
      return;
    }

    this.formControl = null;
  }

  public selectOptions = input.required<SelectOption[]>();
  public icon = input<IconProp>(faSearch);

  // Public Properties
  public formControl: FormControl | null = null;
}
