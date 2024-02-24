import { AbstractControl, ValidatorFn } from '@angular/forms';

export const UrlValidatorFn: ValidatorFn = (control: AbstractControl) => {
  const value = control.value as string;

  if (!value) {
    return null;
  }

  const valid = value.startsWith('http://') || value.startsWith('https://');

  return valid ? null : { url: true };
};
