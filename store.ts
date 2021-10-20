import thunk from 'redux-thunk';
import { antsReducer, AntsState } from './reducers/ant-reducer';
import { applyMiddleware, createStore, combineReducers} from 'redux';

const rootReducer = combineReducers({
  ants: antsReducer,
});

export type AppState = {
  ants: AntsState;
};

export default createStore(rootReducer,applyMiddleware(thunk));