import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {User} from '@modules/general/user/shared/user';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {environment} from '@env';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private userSubject: BehaviorSubject<User>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
  }

  currentUser(): User {
    return this.userSubject.value;
  }

  login(loginForm: { username: string, password: string }) {
    return this.http.post<User>(`${environment.apiUrl}/common-user/login`, loginForm)
      .pipe(map(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.router.navigate(['authenticate'])
      .then(_ => console.log('navigate to login'));
  }
}
