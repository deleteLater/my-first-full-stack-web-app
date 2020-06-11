import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {TodoItemReadComponent} from '@modules/home/todo/todo-item-read.component';
import {TodoItemComponent} from '@modules/home/todo/todo-item.component';
import {Todo} from '@modules/home/todo/shared/todo';
import {TodoItemUpdateComponent} from '@modules/home/todo/todo-item-update.component';

@Component({
  selector: 'app-todo-item-container',
  template: `
    <ng-container #host>
    </ng-container>
  `,
  styles: []
})
export class TodoItemContainerComponent implements OnInit {

  @Input()
  todo: Todo;

  @ViewChild('host', {static: true, read: ViewContainerRef})
  host: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    this.loadComponent(TodoItemReadComponent);
  }

  loadComponent(component: Type<TodoItemComponent>) {
    this.host.clear();

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef = this.host.createComponent(componentFactory);

    const instance = componentRef.instance;
    instance.todo = this.todo;

    if (instance instanceof TodoItemReadComponent) {
      instance.changeToUpdateViewEvent.subscribe(
        _ => this.loadComponent(TodoItemUpdateComponent)
      );
    }
    if (instance instanceof TodoItemUpdateComponent) {
      instance.changeToReadViewEvent.subscribe(
        _ => this.loadComponent(TodoItemReadComponent)
      );
    }

    return componentRef;
  }
}

