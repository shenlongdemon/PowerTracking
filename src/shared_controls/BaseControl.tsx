import React from 'react';
import {IControl} from './IControl';

export interface Props extends IControl {
  id: string;
}

export default class BaseControl<
  P extends Props,
> extends React.PureComponent<P> {
  constructor(props: P) {
    super(props);
    this.doAction.bind(this);
  }
  protected doAction = (action: () => void): void => {
    setTimeout((): void => {
      action();
    }, 1);
  };
}
