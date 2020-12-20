import React from 'react';

export default class PureComponent<P> extends React.PureComponent<P> {
  constructor(props: P) {
    super(props);
  }

  protected doAction = (action: () => void): void => {
    setTimeout((): void => {
      action();
    }, 1);
  };
}
