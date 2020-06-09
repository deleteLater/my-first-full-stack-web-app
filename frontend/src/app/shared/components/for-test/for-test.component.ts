import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {toggleStatus} from './example.actions';

@Component({
  selector: 'app-for-test',
  templateUrl: './for-test.component.html',
  styleUrls: ['./for-test.component.scss']
})
export class ForTestComponent implements OnInit {

  status$: Observable<boolean>;

  constructor(private store: Store<{ status: boolean }>) {
    this.status$ = store.pipe(select('status'));
  }

  toggle() {
    this.store.dispatch(toggleStatus());
  }

  ngOnInit(): void {
  }
}
