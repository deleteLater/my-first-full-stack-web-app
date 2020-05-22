import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../models/user';
import {catchError, map, tap} from 'rxjs/operators';
import {PageParam} from '../models/page-param';
import {environment} from '../../environments/environment';
import {PagedResult} from '../models/paged-result';
import {TenantService} from './tenant.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/${environment.production ? 'common-user' : 'users'}`;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private httpClient: HttpClient,
    private tenantService: TenantService
  ) {
  }

  getUsers(pageParam: PageParam): Observable<any> {
    return this.httpClient.get<any>(
      `${this.baseUrl}/${pageParam.generatePaginationQuery()}`,
      {observe: 'response', headers: {__tenant: `${this.tenantService.getTenant()}`}}
    ).pipe(
      tap(response => console.log(`fetched users: ${response.body.length ?? response.body.totalCount}`)),
      catchError(this.handleError<User[]>('getUsers', []))
    );
  }

  getByName(name: string, pageParam: PageParam): Observable<any> {
    return environment.production ?
      this.httpClient.get<PagedResult>(`${this.baseUrl}/${pageParam.generatePaginationQuery()}&Name=${name}`)
        .pipe(
          catchError(this.handleError<PagedResult>('getByName', null))
        )
      :
      // json-server
      this.httpClient.get<User[]>(`${this.baseUrl}`)
        .pipe(
          map(users => users
            .filter(user => user.name.startsWith(name))
            .slice(
              pageParam.pageIndex * pageParam.pageSize,
              (pageParam.pageIndex + 1) * pageParam.pageSize
            )
          ),
          catchError(this.handleError<User[]>('getByName', []))
        );
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(_ => console.log(`fetched user id = ${id}`)),
        catchError(this.handleError<User>(`getUser`))
      );
  }

  createUser(user: User) {
    return this.httpClient.post(this.baseUrl, user, this.httpOptions)
      .pipe(
        tap((newUser: User) => console.log(`added user w/ id =${newUser.id}`),
          this.handleError('createUser', user)
        )
      );
  }

  updateUser(user: User): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${user.id}`, user, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated user id =${user.id}`)),
        catchError(this.handleError<any>(`updateUser`))
      );
  }

  deleteUser(id: number) {
    return this.httpClient.delete(`${this.baseUrl}/${id}`, this.httpOptions)
      .pipe(
        tap(_ => console.log(`delete user ${id}`)),
        catchError(this.handleError('deleteUser'))
      );
  }

  // returns an error handler function to catchError
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
