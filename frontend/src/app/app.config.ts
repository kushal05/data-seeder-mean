import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors, HttpHandlerFn } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([
      (req, next: HttpHandlerFn) => next(req).pipe(
        catchError(error => {
          let errorMessage = 'An error occurred';
          if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = error.error.message;
          } else {
            // Server-side error
            errorMessage = error.error.message || error.message;
          }
          console.error(errorMessage);
          return throwError(() => new Error(errorMessage));
        })
      )
    ])),
    provideAnimationsAsync()
  ]
};
