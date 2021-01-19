import {RootState} from 'src/redux/rootReducer';
import {connect} from 'react-redux';

export const map = <TInjectedProps>(
  type: any,
  state: (state: RootState, ownProps?: any) => TInjectedProps,
): any => {
  //InferableComponentEnhancerWithProps<TInjectedProps & DispatchProp, any>
  const connector = connect(state, null, null, {forwardRef: true});
  // @ts-ignore
  return connector(type);
};
