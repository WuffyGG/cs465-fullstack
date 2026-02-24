import { Injectable, Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Authentication } from '../services/authentication';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(
    private authenticationService: Authentication
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let isAuthAPI: boolean;

    // NOTE: your TripData uses full URLs like http://localhost:3000/api/login
    // so we must check for "/login" and "/register" in the URL
    if (request.url.includes('/login') || request.url.includes('/register')) {
      isAuthAPI = true;
    } else {
      isAuthAPI = false;
    }

    if (this.authenticationService.isLoggedIn() && !isAuthAPI) {
      let token = this.authenticationService.getToken();

      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      return next.handle(authReq);
    }

    return next.handle(request);
  }
}

export const authInterceptProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: JwtInterceptor,
  multi: true
};