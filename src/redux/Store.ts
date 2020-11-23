import {createStore, applyMiddleware, compose} from 'redux';
import {rootReducer} from 'src/redux/rootReducer';

const configureStore = createStore(rootReducer);
export default configureStore;
