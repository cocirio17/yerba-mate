import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (typeof sessionStorage === 'undefined') return next.handle(req);
    try {
      const session = JSON.parse(sessionStorage.getItem('yerbashop.session') || 'null');
      if (!session?.token) return next.handle(req);
      return next.handle(req.clone({
        setHeaders: { Authorization: `Bearer ${session.token}` }
      }));
    } catch {
      return next.handle(req);
    }
  }
}
