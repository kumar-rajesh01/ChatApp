import { HttpInterceptorFn } from '@angular/common/http';

export const appLoaderInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
