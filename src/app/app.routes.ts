import { Routes } from '@angular/router';

/**
 * Root application routes.
 */
export const routes: Routes = [
  {
    path: '',
    title: 'PicobelloGo | Order Pickup',
    loadComponent: () =>
      import('./features/public-order/pages/order-page.component').then(
        (component) => component.OrderPageComponent
      )
  },
  {
    path: '**',
    redirectTo: ''
  }
];
