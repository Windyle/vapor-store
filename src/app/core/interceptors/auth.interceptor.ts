import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Auth Interceptor');

  req = req.clone({
    setHeaders: {
      Authorization: 'Bearer vapor',
    },
  });

  return next(req);
};
