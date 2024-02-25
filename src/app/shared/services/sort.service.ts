import { Injectable, effect, signal } from '@angular/core';
import { SelectOption } from '../../core/types/select-option';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class SortService {
  // Constants
  public readonly SortSelectOptions: SelectOption[] = [
    { value: 'name_asc', label: 'Name (Ascending)' },
    { value: 'name_desc', label: 'Name (Descending)' },
    { value: 'price_asc', label: 'Price (Ascending)' },
    { value: 'price_desc', label: 'Price (Descending)' },
  ];

  // Public Properties
  public sortControl: FormControl = new FormControl(
    this.SortSelectOptions[0].value,
  );

  public sortOption = signal<string>(this.sortControl.value);

  constructor() {
    this.sortControl.valueChanges.subscribe({
      next: (value: string) => {
        this.sortOption.set(value);
      },
    });
  }
}
