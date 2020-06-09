import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() {
  }

  generatePassword(length: number = 16): string {
    const source = 'abcdefghijklmnopqrstuvwxyz0123456789!@#%^*+=:;"/?.><,';

    let pwd = '';

    for (let i = 0; i < length; i++) {
      pwd += source[Math.floor(Math.random() * source.length)];
    }

    return pwd;
  }
}
