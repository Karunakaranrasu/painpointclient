import { Injectable } from '@angular/core';
import { State, Action, StateContext } from '@ngxs/store';

export class SetItems {
  static readonly type = '[MyState] Set Items';
  constructor(public payload: boolean) {}
}

export interface MyStateModel {
  items: boolean;
}

@State<MyStateModel>({
  name: 'myState',
  defaults: {
    items: false,
  },
})
@Injectable()
export class MyState {
  @Action(SetItems)
  setItems(ctx: StateContext<MyStateModel>, action: SetItems) {
    ctx.setState({
      items: action.payload,
    });
  }
}
