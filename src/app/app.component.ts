import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Root application shell that delegates rendering to the router.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: '<router-outlet />'
})
export class AppComponent {}
