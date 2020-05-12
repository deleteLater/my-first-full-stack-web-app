import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {User} from '../models/user';
import {catchError, map, tap} from 'rxjs/operators';
import {PageParam} from '../models/page-param';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:3000/users';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getUsers(pageParam: PageParam): Observable<any> {
    return this.httpClient.get<User[]>(`${this.baseUrl}/${pageParam.generatePaginationQuery()}`, {observe: 'response'})
      .pipe(
        tap(value => console.log(`fetched users: ${value.body.length}`)),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  getByName(name: string, pageParam: PageParam): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.baseUrl}`)
      .pipe(
        map(users => users
          .filter(user => user.name.startsWith(name))
          .slice(
            pageParam.pageIndex * pageParam.pageSize,
            (pageParam.pageIndex + 1) * pageParam.pageSize
          )
        )
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
        tap((newUser: User) => console.log(`added user w/ id=${newUser.id}`),
          this.handleError('createUser', user)
        )
      );
  }

  updateUser(user: User): Observable<any> {
    return this.httpClient.put(this.baseUrl, user, this.httpOptions)
      .pipe(
        tap(_ => console.log(`updated user id=${user.id}`)),
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
