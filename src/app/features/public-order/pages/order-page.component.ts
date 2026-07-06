import { ChangeDetectionStrategy, Component } from '@angular/core';

/**
 * Entry page for the public pickup order flow.
 */
@Component({
  selector: 'app-order-page',
  standalone: true,
  templateUrl: './order-page.component.html',
  styleUrl: './order-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderPageComponent {
  protected readonly highlights = [
    'Clear garment pricing and quantity selection',
    'Pickup booking with customer contact details',
    'Architecture prepared for secure backend integration'
  ];
}
