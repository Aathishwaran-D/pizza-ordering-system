import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service'; // Adjust the import path as necessary
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

export const authgaurdGuard: CanActivateFn = (route, state) => {
  // Inject the UserService and Router
  const userService = inject(UserService);
  const router = inject(Router);

  // Check if the user is authenticated
  const token = userService.getToken();
  if (!token) {
    router.navigate(['/login']);
    return of(false);
  }

  // If authenticated, check user role (example: for admin)
  return userService.getUserRole().pipe(
    map(roles => {
      if (roles.includes('ROLE_ADMIN')) {
        return true; // Allow access
      } else {
        router.navigate(['/home']); // Redirect non-admins
        return false;
      }
    }),
    tap(hasAccess => {
      if (!hasAccess) {
        router.navigate(['/login']); // Redirect if no access
      }
    })
  );
};
