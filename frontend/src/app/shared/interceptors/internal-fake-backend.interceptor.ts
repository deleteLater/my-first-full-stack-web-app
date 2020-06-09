import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {delay, dematerialize, materialize, mergeMap} from 'rxjs/operators';

@Injectable()
export class InternalFakeBackendInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const {url, method} = request;

    return of(null)
      .pipe(
        mergeMap(handleRoute),
        materialize(),
        delay(500),
        dematerialize()
      );

    function login() {
      return of(
        new HttpResponse({
          status: 200,
          body: {
            id: 1,
            name: 'fake-user',
            sex: 'boy',
            avatar: 'hacker',
            email: 'mikcczhang@gmail.com',
            phone: '+86 15338593769',
            role: 'admin',
            description: 'this is a fake user',
            online: true
          }
        })
      );
    }

    function handleRoute() {
      switch (true) {
        case url.endsWith('/common-user/login') && method === 'POST':
          return login();
        default:
          // pass through any requests not handled above
          return next.handle(request);
      }
    }
  }
}
