import { CommonModule, CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { SERVICE_ITEMS } from '../data/service-items';
import { ServiceItem } from '../models/service-item.model';
import { atLeastOneQuantityValidator } from '../validators/at-least-one-quantity.validator';
import { notInPastDateValidator } from '../validators/not-in-past-date.validator';

type OrderItemFormGroup = FormGroup<{
  serviceItemId: FormControl<string>;
  quantity: FormControl<number>;
}>;

type OrderFormGroup = FormGroup<{
  items: FormArray<OrderItemFormGroup>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  phone: FormControl<string>;
  email: FormControl<string>;
  street: FormControl<string>;
  houseNumber: FormControl<string>;
  postalCode: FormControl<string>;
  city: FormControl<string>;
  pickupDate: FormControl<string>;
  notes: FormControl<string>;
  privacyAccepted: FormControl<boolean>;
}>;

type OrderFieldName = Exclude<keyof OrderFormGroup['controls'], 'items'>;

/**
 * Entry page for the public pickup order flow.
 */
@Component({
  selector: 'app-order-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CurrencyPipe],
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPageComponent {
  protected readonly serviceItems = SERVICE_ITEMS;
  protected readonly minimumPickupDate = this.getMinimumPickupDate();

  protected readonly orderForm: OrderFormGroup;

  protected submitAttempted = false;
  protected successMessage = '';

  public constructor(private readonly formBuilder: NonNullableFormBuilder) {
    this.orderForm = this.formBuilder.group({
      items: this.formBuilder.array(
        this.serviceItems.map((item) =>
          this.formBuilder.group({
            serviceItemId: this.formBuilder.control(item.id),
            quantity: this.formBuilder.control(0, {
              validators: [Validators.required, Validators.min(0), Validators.max(25)]
            })
          })
        ),
        {
          validators: [atLeastOneQuantityValidator()]
        }
      ),
      firstName: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      lastName: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      phone: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^(?:(?:\+49|0)[1-9]\d{1,4}[\s/-]?\d{3,})$/)
      ]),
      email: this.formBuilder.control('', [Validators.required, Validators.email]),
      street: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      houseNumber: this.formBuilder.control('', [Validators.required, Validators.maxLength(10)]),
      postalCode: this.formBuilder.control('', [
        Validators.required,
        Validators.pattern(/^\d{5}$/)
      ]),
      city: this.formBuilder.control('', [Validators.required, Validators.minLength(2)]),
      pickupDate: this.formBuilder.control('', [
        Validators.required,
        notInPastDateValidator()
      ]),
      notes: this.formBuilder.control('', [Validators.maxLength(500)]),
      privacyAccepted: this.formBuilder.control(false, [Validators.requiredTrue])
    });
  }

  /**
   * Convenience accessor for the order item form array.
   */
  protected get itemControls(): OrderItemFormGroup[] {
    return this.orderForm.controls.items.controls;
  }

  /**
   * Returns all currently selected order items with quantity and pricing.
   */
  protected get selectedItems(): Array<ServiceItem & { quantity: number; lineTotal: number }> {
    return this.itemControls
      .map((control) => {
        const serviceItem = this.serviceItems.find(
          (item) => item.id === control.controls.serviceItemId.value
        );

        if (!serviceItem) {
          return null;
        }

        const quantity = control.controls.quantity.value;
        return quantity > 0
          ? {
              ...serviceItem,
              quantity,
              lineTotal: serviceItem.price * quantity
            }
          : null;
      })
      .filter(
        (item): item is ServiceItem & { quantity: number; lineTotal: number } => item !== null
      );
  }

  /**
   * Calculates the current total price of the selected items.
   */
  protected get totalPrice(): number {
    return this.selectedItems.reduce((sum, item) => sum + item.lineTotal, 0);
  }

  /**
   * Submits the current form state once all client-side validation rules pass.
   */
  protected submitOrder(): void {
    this.submitAttempted = true;
    this.successMessage = '';

    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }

    this.successMessage =
      'Order request captured locally. Backend persistence and operator notification will be connected in the next implementation step.';
  }

  /**
   * Returns whether a given control currently needs an error message in the UI.
   *
   * @param controlName Control key from the root order form.
   * @returns `true` when the control is invalid and should display feedback.
   */
  protected shouldShowFieldError(controlName: OrderFieldName): boolean {
    const control = this.orderForm.controls[controlName];
    return control.invalid && (control.touched || this.submitAttempted);
  }

  /**
   * Returns whether the item selection group should display a validation error.
   */
  protected shouldShowItemSelectionError(): boolean {
    const itemsControl = this.orderForm.controls.items;
    return itemsControl.invalid && (itemsControl.touched || this.submitAttempted);
  }

  /**
   * Finds the configured item metadata for a form row.
   *
   * @param index Position inside the form array.
   * @returns Matching service item.
   */
  protected getServiceItem(index: number): ServiceItem {
    return this.serviceItems[index];
  }

  /**
   * Tracks item rows by stable item id.
   *
   * @param index Position inside the form array.
   * @returns Stable tracking key for Angular list rendering.
   */
  protected trackByItemId(index: number): string {
    return this.itemControls[index].controls.serviceItemId.value;
  }

  /**
   * Creates the minimum date string accepted by the native date input.
   *
   * @returns Current date in `YYYY-MM-DD` format.
   */
  private getMinimumPickupDate(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
