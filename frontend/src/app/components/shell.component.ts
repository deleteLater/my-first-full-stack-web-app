import {Component, OnInit} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import {NestedTreeControl} from '@angular/cdk/tree';
import {Router} from '@angular/router';

export interface ComponentTreeNode {
  path: string;
  label: string;
  children: ComponentTreeNode[];
}

const TREE_DATA: ComponentTreeNode[] = [
  {
    path: '/welcome',
    label: 'first',
    children: []
  },
  {
    path: '/second',
    label: 'second',
    children: [
      {
        path: '/second/sub-one',
        label: 'second-sub-one',
        children: []
      }
    ]
  },
];

@Component({
  selector: 'app-shell',
  template: `
    <div class="container" fxLayout="column">
      <app-nav (toggleNavEvent)="openSideNav = !openSideNav;"></app-nav>
      <mat-sidenav-container fxFlex="grow">
        <mat-sidenav #sidenav mode="side" [(opened)]="openSideNav">

          <mat-tree [dataSource]="treeDataSource" [treeControl]="treeControl" class="component-tree">
            <!-- This is the tree node template for leaf nodes -->
            <mat-tree-node *matTreeNodeDef="let node" matTreeNodeToggle (click)="navigateTo(node.path)">
              <li class="mat-tree-node">
                <!-- use a disabled button to provide padding for tree leaf -->
                <button mat-icon-button disabled></button>
                {{node.label}}
              </li>
            </mat-tree-node>
            <!-- This is the tree node template for expandable nodes -->
            <mat-nested-tree-node *matTreeNodeDef="let node; when: hasChild">
              <li>
                <div class="mat-tree-node">
                  <button mat-icon-button matTreeNodeToggle
                          [attr.aria-label]="'toggle ' + node.name">
                    <mat-icon class="mat-icon-rtl-mirror">
                      {{treeControl.isExpanded(node) ? 'expand_more' : 'chevron_right'}}
                    </mat-icon>
                  </button>
                  {{node.label}}
                </div>
                <ul [class.component-tree-invisible]="!treeControl.isExpanded(node)">
                  <ng-container matTreeNodeOutlet></ng-container>
                </ul>
              </li>
            </mat-nested-tree-node>
          </mat-tree>

        </mat-sidenav>
        <mat-sidenav-content>
          <router-outlet></router-outlet>
        </mat-sidenav-content>
      </mat-sidenav-container>
    </div>
  `,
  styles: [`
    .container {
      height: 100%;
    }

    mat-sidenav {
      width: 200px;
    }

    .component-tree-invisible {
      display: none;
    }

    .component-tree ul,
    .component-tree li {
      margin-top: 0;
      margin-bottom: 0;
      list-style-type: none;
    }`]
})
export class ShellComponent implements OnInit {

  openSideNav = true;

  treeControl = new NestedTreeControl<ComponentTreeNode>(node => node.children);
  treeDataSource = new MatTreeNestedDataSource<ComponentTreeNode>();

  hasChild(_: number, node: ComponentTreeNode): boolean {
    return !!node.children && node.children.length > 0;
  }

  constructor(
    private router: Router
  ) {
    this.treeDataSource.data = TREE_DATA;
  }

  ngOnInit(): void {
  }

  navigateTo(path: string) {
    this.router.navigate([path])
      .then(result => console.log(`navigate to ${path}: ${result}`));
  }
}
