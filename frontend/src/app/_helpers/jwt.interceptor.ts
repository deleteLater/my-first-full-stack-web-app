import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    request = request.clone({
      setHeaders: {
        // tslint:disable-next-line:max-line-length
        Authorization: `Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IkJxaU1VekdSX3gtejRRejc4SmU4bGciLCJ0eXAiOiJhdCtqd3QifQ.eyJuYmYiOjE1OTExOTQ0MzMsImV4cCI6MTU5MTIwNTIzMywiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAwIiwiYXVkIjoiU2FhU0FwcGxpY2F0aW9uTWFuYWdlbWVudCIsImNsaWVudF9pZCI6IlNhYVNBcHBsaWNhdGlvbk1hbmFnZW1lbnQiLCJzdWIiOiJiOGNiZTJiNy03Zjc3LWMxMWUtN2E5MS0zOWY0ZTA4ZTFhMWUiLCJhdXRoX3RpbWUiOjE1OTExOTQ0MzIsImlkcCI6ImxvY2FsIiwicm9sZSI6ImFkbWluIiwibmFtZSI6ImFkbWluIiwic2NvcGUiOlsiU2FhU0FwcGxpY2F0aW9uTWFuYWdlbWVudCJdLCJhbXIiOlsicHdkIl19.N-TvqEHuNM3veGRUgQA6WlTcQRl5HHCXKUm8arwU1kc9pAnuXnHTBm--HtNizCbcOVnwtTpJlkgz7--ygl4Em_o1MPS_UzFFpi8S3uK8zDn2dmU6lUG7MuyB3t_poTFiabEGjGKiWB6pbSrqgD5DYeJlM7zM2-4E0K0v8wuN66eyGdE6LeFMKkmsA8ftUHBQHbHV3qQekTh_dvl-ddW0eVNQxnUuJkAxWn8870tzTtlca578gPhQBTP128k2mZj2Sc2cPQbmwiBHBo5x3rpiXujrdj5stChUxoY_dLnfqjnVcoevMm3ZOjmaq7hhJJsDZAZZOvbwJDfDH_AVzMdZzw`
      }
    });

    return next.handle(request);
  }
}
