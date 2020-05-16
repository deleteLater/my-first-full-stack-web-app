import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {SaveUserDialogComponent} from './save-user-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteUserDialogComponent} from './delete-user-dialog.component';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserSnackBarComponent} from './user-snack-bar.component';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {PageParam} from '../../../models/page-param';
import {iif, of, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {CrudOperation} from '../../../models/crud-operation.enum';

export interface SaveUserInfo {
  action: string;
  user: User;
}

export interface SimpleUserInfo {
  name: string;
  avatar: string;
  description: string;
}

const initialSelection = [];
const allowMultiSelect = true;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['select', 'id', 'online', 'name', 'sex', 'role', 'phone', 'email', 'description', 'action'];
  dataSource = new MatTableDataSource<User>();
  selection = new SelectionModel<User>(allowMultiSelect, initialSelection);
  total: number;

  Operation = CrudOperation;

  private searchNames = new Subject<string>();

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private service: UserService
  ) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const pageParam = this.getCurrentPageParam();

    // Init DataSource
    this.refresh(pageParam);
    this.dataSource.sort = this.sort;

    // Search By Name
    this.searchNames.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(name =>
        iif(() => name !== '', this.service.getByName(name, pageParam), of([]))
      )
    ).subscribe((users) => {

      if (users.length) {
        this.dataSource.data = users;
        this.total = users.length;
        this.table.renderRows();
      } else {
        this.refresh(pageParam);
      }
    });
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (!this.dataSource) {
      return false;
    }

    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  searchByName(name: string) {
    this.searchNames.next(name);
  }

  save(info: SaveUserInfo) {
    console.log(info);
    const dialogRef = this.dialog.open(SaveUserDialogComponent, {
      disableClose: true,
      autoFocus: true,
      width: '500px',
      data: info
    });

    dialogRef.afterClosed().subscribe(formValue => {
      console.log(formValue);

      if (formValue) {
        switch (info.action) {
          case this.Operation.Update:
            this.service.updateUser(formValue).subscribe(
              updatedUser => {
                console.log(`update user: ${updatedUser.id}`);
                this.refresh(this.getCurrentPageParam());
              }
            );
            break;
          case this.Operation.Create:
            this.service.createUser(formValue).subscribe(
              newUser => {
                console.log(`create new user: ${newUser.id}`);
                this.refresh(this.getCurrentPageParam());
              }
            );
            break;
          default:
            break;
        }
      }

      this.openSnackBar(formValue ? `${info.action.toLowerCase()} success` : 'user cancel');
    });
  }

  delete() {
    if (!this.selection.hasValue()) {
      this.openSnackBar('no operation should be taken!');
      return;
    }

    const userSimpleInfo = this.selection.selected.map(user => {
      return {
        name: user.name,
        avatar: user.avatar,
        description: user.description
      };
    });

    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      disableClose: true,
      autoFocus: true,
      width: '400px',
      data: userSimpleInfo
    });

    dialogRef.afterClosed().subscribe(deleted => {
      console.log(this.selection.selected);
      if (deleted) {
        this.selection.selected.forEach(user => {
          this.service.deleteUser(user.id)
            .subscribe(() => {
              console.log(`delete user successfully: ${user.id}`);
              this.refresh(this.getCurrentPageParam());
            });
        });
      }

      this.openSnackBar(deleted ? 'delete success' : 'user cancel');
    });
  }

  paginatorChanged($event: PageEvent) {
    console.log(`${JSON.stringify($event)}`);
    this.refresh(new PageParam($event.pageIndex, $event.pageSize));
  }

  refreshCurrentData() {
    this.refresh(this.getCurrentPageParam());

    this.openSnackBar('refresh all data success');
  }

  private openSnackBar(msg: string) {
    this.snackBar.openFromComponent(UserSnackBarComponent, {
      data: msg,
      duration: 1000,
      horizontalPosition: 'end',
      panelClass: ['common-snackbar']
    });
  }

  private refresh(pageParam: PageParam) {
    this.service.getUsers(pageParam)
      .subscribe(response => {
          // specify to json-server
          this.total = response.headers.get('X-Total-Count');
          this.dataSource.data = response.body;
          this.selection.clear();
          this.table.renderRows();
        }
      );
  }

  private getCurrentPageParam(): PageParam {
    console.log(`${this.paginator.pageIndex}, ${this.paginator.pageSize}`);
    return new PageParam(this.paginator.pageIndex, this.paginator.pageSize);
  }

  updateColumn(element: any) {
    console.log(element);
  }
}
