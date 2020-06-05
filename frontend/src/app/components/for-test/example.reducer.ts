import {createReducer, on} from '@ngrx/store';
import {toggleStatus} from './example.actions';

export const initialState = true;

// tslint:disable-next-line:variable-name
const _exampleReducer = createReducer(initialState,
  on(toggleStatus, state => {
    state = !state;
    return state;
  })
);

export function exampleReducer(state, action) {
  return _exampleReducer(state, action);
}
