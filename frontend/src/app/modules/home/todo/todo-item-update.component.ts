import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TodoItemComponent} from '@modules/home/todo/todo-item.component';
import {Todo} from '@modules/home/todo/shared/todo';

@Component({
  selector: 'app-todo-item-update',
  template: `
    <div fxLayout="column" class="container">
      <div class="item-editor" fxLayout="row">
        <input id="title-input" type="text" fxFlex="80" [value]="todo.title">
        <input type="date" [value]="todo.createdTime.toISOString().split('T')[0]" fxFlex>
      </div>
      <div fxLayout="row" fxLayoutAlign="space-between">
        <div>
          <button mat-raised-button (click)="changeToReadViewEvent.emit()">SAVE</button>
          <button mat-flat-button (click)="changeToReadViewEvent.emit()">Cancel</button>
        </div>
        <div>
          <mat-icon [svgIcon]="todo.priority" class="action-item" [matMenuTriggerFor]="priorityMenu"></mat-icon>
        </div>
      </div>
    </div>
    <mat-menu #priorityMenu="matMenu" class="mat-elevation-z2">
      <button mat-menu-item (click)="changePriority('priority-1')">
        <mat-icon svgIcon="priority-1"></mat-icon>
        <span>Priority 1</span>
      </button>
      <button mat-menu-item (click)="changePriority('priority-2')">
        <mat-icon svgIcon="priority-2"></mat-icon>
        <span>Priority 2</span>
      </button>
      <button mat-menu-item (click)="changePriority('priority-3')">
        <mat-icon svgIcon="priority-3"></mat-icon>
        <span>Priority 3</span>
      </button>
    </mat-menu>
  `,
  styles: [`
    .container {
      padding: 5px 0;
      border-bottom: 1px solid #f0f0f0;
      height: auto;
    }

    input {
      border: none;
      height: 40px;
      padding-left: 10px;
    }
    #title-input {
      border-right: 1px solid #ddd;
    }

    .item-editor {
      font-size: 13px;
      border: 1px solid #ddd;
      border-radius: 3px;
      margin-bottom: 6px;
    }

    .action-item {
      color: gray;
      margin-left: 10px;
      cursor: pointer;
    }
    .action-item:hover {
      color: #202020;
      background-color: #eee;
      border-radius: 3px;
    }

    .mat-raised-button,
    .mat-flat-button {
      height: 28px;
      width: 28px;
      line-height: 14px;
      padding: 0 14px;
    }
    .mat-flat-button {
      padding: 0;
      margin-left: 5px;
    }
  `]
})
export class TodoItemUpdateComponent implements OnInit, TodoItemComponent {

  @Input()
  todo: Todo;

  @Output()
  changeToReadViewEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
  }

  changePriority(priority: string) {
    this.todo.priority = priority;
  }

  todayCreated(): boolean {
    const today = new Date();
    const createdTime = this.todo.createdTime;

    return createdTime.getDate() === today.getDate() &&
      createdTime.getMonth() === today.getMonth() &&
      createdTime.getFullYear() === today.getFullYear();
  }

  toggleComplete() {
    this.todo.complete = !this.todo.complete;
  }
}
