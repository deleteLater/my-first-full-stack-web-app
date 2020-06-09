import {Component, Input, OnInit} from '@angular/core';
import {Todo} from '../../../models/todo';

@Component({
  selector: 'app-todo-item',
  template: `
    <div fxLayout="column" class="container">
      <div fxLayout="row" fxLayoutAlign="space-between center" class="content">
        <div class="icon-text">
          <mat-icon id="checkbox"
                    (click)="toggleComplete()">{{!todo.complete ? 'radio_button_unchecked' : 'check_circle_outline'}}</mat-icon>
          <span [class.completed]="todo.complete">{{todo.title}}</span>
        </div>
        <div class="actions">
          <mat-icon svgIcon="edit" class="action-item"></mat-icon>
          <mat-icon svgIcon="comment" class="action-item"></mat-icon>
          <mat-icon [svgIcon]="todo.priority" class="action-item" [matMenuTriggerFor]="priorityMenu"></mat-icon>
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
        </div>
      </div>
      <div class="details">
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
      margin-left: 10px;
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
export class TodoItemComponent implements OnInit {

  @Input()
  todo: Todo;

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

  changePriority(priority: string) {
    this.todo.priority = priority;
  }
}
