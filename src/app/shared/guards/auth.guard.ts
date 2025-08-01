import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from "../services/auth.service";
import {Observable, tap} from "rxjs";


export const authGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('authGuard', authService.isAuthenticated())

  return authService.isAuthenticatedObs$.pipe(
    tap((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigate(['/log-in']);
      }
    })
  );
};
