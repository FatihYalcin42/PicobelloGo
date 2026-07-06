import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Requires at least one service item quantity greater than zero.
 *
 * @returns Validation error when no order item has been selected.
 */
export function atLeastOneQuantityValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formArray = control as FormArray;

    const hasSelectedItem = formArray.controls.some((group) => {
      const quantity = group.get('quantity')?.value;
      return typeof quantity === 'number' && quantity > 0;
    });

    return hasSelectedItem ? null : { noItemsSelected: true };
  };
}
