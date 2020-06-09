import {Component, OnInit} from '@angular/core';
import {Todo} from './shared/todo';
import {User} from '../../general/user/shared/user';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {
  // open first
  expandPanel: boolean[] = [true, false];

  priority: string;
  time: string;

  testUser: User = {
    id: 1,
    email: 'mikcczhang@gmail.com',
    name: 'zhang',
    avatar: 'default',
    role: 'admin',
    description: 'this is a good guy!',
    phone: '+86 15338593769',
    sex: 'boy',
    online: false
  };
  todos: Todo[] = [
    {
      id: 1,
      title: 'this is how things works',
      createdBy: this.testUser,
      priority: 'priority-1',
      attachment: null,
      comments: [{
        commenter: this.testUser,
        commentTime: new Date(2020, 1, 1),
        content: 'sold out sold out'
      }],
      complete: false,
      createdTime: new Date(),
      notes: 'this is a test todo',
      tags: ['ok', '666']
    },
    {
      id: 1,
      title: 'this is how things works',
      createdBy: this.testUser,
      priority: 'priority-1',
      attachment: null,
      comments: [{
        commenter: this.testUser,
        commentTime: new Date(2020, 1, 1),
        content: 'sold out sold out'
      }],
      complete: false,
      createdTime: new Date(),
      notes: 'this is a test todo',
      tags: ['ok', '666']
    },
    {
      id: 1,
      title: 'this is how things works',
      createdBy: this.testUser,
      priority: 'priority-1',
      attachment: null,
      comments: [{
        commenter: this.testUser,
        commentTime: new Date(2020, 1, 1),
        content: 'sold out sold out'
      }],
      complete: false,
      createdTime: new Date(),
      notes: 'this is a test todo',
      tags: ['ok', '666']
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

  openPanel(panelIndex: number) {
    this.expandPanel = this.expandPanel.fill(false);
    this.expandPanel[panelIndex] = true;
  }
}
