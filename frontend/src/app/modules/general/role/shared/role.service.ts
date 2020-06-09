import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  url = 'http://localhost:5000/api/identity/roles';

  constructor(
    private http: HttpClient
  ) {
  }

  getAll() {
    this.http.get<any>(`${this.url}/all`)
      .subscribe(value => console.log(value),
        error => console.log(error)
      );
  }
}
