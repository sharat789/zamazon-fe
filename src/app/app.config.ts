import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { authGuard } from './guards/auth.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(),
    importProvidersFrom(ReactiveFormsModule),
    { provide: 'authGuard', useValue: authGuard },
  ],
};
