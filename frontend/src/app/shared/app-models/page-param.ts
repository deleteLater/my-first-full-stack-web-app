import {environment} from '@env';

export class PageParam {
  constructor(public pageIndex: number = 0, public pageSize: number = 10) {
  }

  generatePaginationQuery(): string {
    return environment.production ?
      // for production-server-pagination
      `?SkipCount=${this.pageIndex}&MaxResultCount=${this.pageSize}` :

      // for json-server-pagination
      // why +1 ? because the mat-paginator is zero-based while json-server is one-based index
      `?_page=${this.pageIndex + 1}&_limit=${this.pageSize}`;
  }
}
