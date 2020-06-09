import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TenantService {

  private tenant: string;

  constructor() {
    this.tenant = '';
  }

  public changeTenant(tenant: string) {
    this.tenant = tenant;
  }

  public getTenant(): string {
    return this.tenant;
  }
}
