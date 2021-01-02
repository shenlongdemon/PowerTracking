import {RootState} from 'src/redux/rootReducer';
import {connect} from 'react-redux';

export const map = <TInjectedProps>(
  type: any,
  state: (state: RootState) => TInjectedProps,
): any => {
  //InferableComponentEnhancerWithProps<TInjectedProps & DispatchProp, any>
  const connector = connect(state);
  // @ts-ignore
  return connector(type);
};
