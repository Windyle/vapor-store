import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform, inject } from '@angular/core';

@Pipe({
  name: 'price',
  standalone: true,
})
export class PricePipe implements PipeTransform {
  currencyPipe = inject(CurrencyPipe);

  transform(value: number | string | undefined): string {
    let formattedValue = this.currencyPipe.transform(value);

    console.log('PricePipe', value, formattedValue);

    // Return "Free to Play" for 0 values
    if (value == 0) {
      return 'Free to Play';
    }

    return formattedValue || '';
  }
}
