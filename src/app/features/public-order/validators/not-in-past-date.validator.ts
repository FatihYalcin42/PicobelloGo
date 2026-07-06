import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Ensures that a date input is not earlier than the current local date.
 *
 * @returns Validation error when the selected date is in the past.
 */
export function notInPastDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const selectedDate = new Date(`${value}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return selectedDate < today ? { pastDate: true } : null;
  };
}
