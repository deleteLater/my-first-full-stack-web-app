import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SideNavService {

  sideNavOpened = true;

  constructor() {
  }

  public toggle() {
    this.sideNavOpened = !this.sideNavOpened;
  }

  public opened(): boolean {
    return this.sideNavOpened;
  }
}
