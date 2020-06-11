import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Todo} from './shared/todo';
import {TodoItemComponent} from '@modules/home/todo/todo-item.component';

@Component({
  selector: 'app-todo-item-view',
  template: `
    <div fxLayout="column" class="container">
      <div fxLayout="row" fxLayoutAlign="space-between center" class="content">
        <div class="icon-text">
          <mat-icon id="checkbox"
                    (click)="toggleComplete()">{{!todo.complete ? 'radio_button_unchecked' : 'check_circle_outline'}}</mat-icon>
          <span [class.completed]="todo.complete">{{todo.title}}</span>
        </div>
        <div class="actions">
          <mat-icon svgIcon="edit" class="action-item" (click)="changeToUpdateViewEvent.emit()"></mat-icon>
          <mat-icon svgIcon="comment" class="action-item"></mat-icon>
        </div>
      </div>
      <div class="details">
        <mat-icon [svgIcon]="todo.priority"></mat-icon>
        <span [class.outdated]="!todayCreated()">{{todo.createdTime | date}}</span>
        <div *ngIf="todo.comments?.length" class="comment-counter icon-text action-item">
          <mat-icon svgIcon="comment"></mat-icon>
          <span>{{todo.comments?.length}}</span>
        </div>
        <div class="avatar-circle-container" title="{{todo.createdBy.name}}">
          <mat-icon [svgIcon]="todo.createdBy.avatar"></mat-icon>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 5px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .content {
      font-size: 14px;
      line-height: 18px;
      color: #333;
    }

    .completed {
      text-decoration: line-through;
    }

    #checkbox {
      cursor: pointer;
    }

    .actions {
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

    .details {
      display: flex;
      align-items: center;
      font-size: 12px;
    }

    .details .outdated {
      color: #d1453b;
    }

    .details > :first-child {
      margin-left: 30px;
    }

    .details > :nth-child(n+2) {
      margin-left: 6px;
    }

    .comment-counter {
    }

    .comment-counter mat-icon {
      height: 16px;
      width: 16px;
    }

    .comment-counter span {
      margin-left: 2px;
    }
  `]
})
export class TodoItemReadComponent implements OnInit, TodoItemComponent {

  @Input()
  todo: Todo;

  @Output()
  changeToUpdateViewEvent = new EventEmitter();

  constructor() {
  }

  ngOnInit(): void {
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
