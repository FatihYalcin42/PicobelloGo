import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

/**
 * Global Angular application configuration.
 */
export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes)]
};
