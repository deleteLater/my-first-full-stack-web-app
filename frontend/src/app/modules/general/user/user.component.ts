import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {AddUserDialogComponent} from './add-user-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {DeleteUserDialogComponent} from './delete-user-dialog.component';

export interface UserDialogDto {
  user: User;
  action: string;
}

class User {
  constructor(
    public id: number,
    public name: string,
    public sex: string,
    public avatar: string,
    public email: string,
    public phone: string,
    public role: string,
    public description?: string,
    public online?: boolean) {
  }
}

export interface SimpleUserInfo {
  name: string;
  avatar: string;
  description: string;
}

const initialSelection = [];
const allowMultiSelect = true;

const ELEMENT_DATA: User[] = [
  new User(1, 'zhang san', 'boy', 'panda', 'zhangsan@gmail.com', '15338593769', 'admin', 'do one thing correctly', false),
  new User(2, 'li si', 'boy', 'peach', 'zhangsan@gmail.com', '15338593769', 'admin', 'do one thing quickly', true),
  new User(3, 'wang wu', 'boy', 'sloth', 'zhangsan@gmail.com', '15338593769', 'admin', 'do one thing perfectly', false),
  new User(4, 'zhao xiang', 'boy', 'bird', 'zhangsan@gmail.com', '15338593769', 'admin', 'do one thing persistently', true),
];

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  displayedColumns: string[] = ['select', 'online', 'name', 'sex', 'role', 'phone', 'email', 'description', 'action'];
  dataSource = new MatTableDataSource<User>(ELEMENT_DATA);

  selection = new SelectionModel<User>(allowMultiSelect, initialSelection);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatTable, {static: true}) table: MatTable<any>;

  constructor(
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.initDataSource();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
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

  applyFilter(name: string) {
    console.log(name);
    this.dataSource.filter = name.trim().toLowerCase();
  }

  private initDataSource() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // filter by name
    this.dataSource.filterPredicate = (data, filter: string) => {
      return data.name.toLowerCase().startsWith(filter);
    };
  }

  create() {
    const dialogRef = this.dialog.open(AddUserDialogComponent, {
      disableClose: true,
      autoFocus: true,
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  delete() {
    if (this.selection.hasValue()) {

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

      dialogRef.afterClosed().subscribe(result => {
        console.log(result);
      });
    }

    console.log('no operation should be taken!');
  }
}
