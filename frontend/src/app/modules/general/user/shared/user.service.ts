import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {User} from './user';
import {catchError, map, tap} from 'rxjs/operators';
import {PageParam} from '@shared/app-models/page-param';
import {environment} from '@env';
import {PagedResult} from '@shared/app-models/paged-result';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = `${environment.apiUrl}/common-user`;
  private httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json',
      },
    )
  };

  constructor(private httpClient: HttpClient) { }

  getUsers(pageParam: PageParam): Observable<PagedResult<User>> {
    return this.httpClient.get<PagedResult<User>>(
      `${this.baseUrl}/${pageParam.generatePaginationQuery()}`, this.httpOptions,
    ).pipe(
      tap(result => console.log(`fetched users: ${result.items.length}`)),
      catchError(this.handleError('getUsers'))
    );
  }

  getByName(name: string, pageParam: PageParam): Observable<PagedResult<User>> {
    if (!name) {
      return this.getUsers(pageParam);
    }

    return environment.production ?
      this.httpClient.get<PagedResult<User>>(
        `${this.baseUrl}/${pageParam.generatePaginationQuery()}&Name=${name}`, this.httpOptions)
        .pipe(
          catchError(this.handleError('getByName'))
        )
      :
      // json-server (get-all then filter)
      this.httpClient.get<PagedResult<User>>(`${this.baseUrl}`)
        .pipe(
          map(users => ({
              totalCount: users.items
                .filter(user => user.name.startsWith(name))
                .length,
              items: users.items
                .filter(user => user.name.startsWith(name))
                .slice(
                  pageParam.pageIndex * pageParam.pageSize,
                  (pageParam.pageIndex + 1) * pageParam.pageSize
                )
            })
          ),
          catchError(this.handleError('getByName'))
        );
  }

  getUser(id: number): Observable<User> {
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`)
      .pipe(
        tap(_ => console.log(`fetched user id = ${id}`)),
        catchError(this.handleError(`getUser`))
      );
  }

  createUser(user: User) {
    return this.httpClient.post(this.baseUrl, user, this.httpOptions)
      .pipe(
        tap((newUser: User) => console.log(`added user w/ id =${newUser.id}`),
          this.handleError('createUser')
        )
      );
  }

  updateUser(user: User): Observable<User> {
    return this.httpClient.put(`${this.baseUrl}/${user.id}`, user, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated user id =${user.id}`)),
        catchError(this.handleError(`updateUser`))
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
  private handleError(operation = 'operation') {
    return (error: any): Observable<any> => {
      console.log(`${operation} failed: ${error.message}`);
      return EMPTY;
    };
  }
}
