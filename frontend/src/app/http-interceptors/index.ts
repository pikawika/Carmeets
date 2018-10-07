import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './AuthenticationInterceptor';
import { BaseUrlInterceptor } from './base-url.interceptors';

export const httpInterceptorProviders = [
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthenticationInterceptor,
    multi: true
  }
];

export const basehttpInterceptorProviders = [
  {
  provide: HTTP_INTERCEPTORS,
  useClass: BaseUrlInterceptor,
  multi: true
  }
 ];
