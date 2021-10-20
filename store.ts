import thunk from 'redux-thunk';
import { antsReducer, AntsState } from './reducers/ant-reducer';
import { gameReducer, GameState } from './reducers/game-reducer';
import { applyMiddleware, createStore, combineReducers} from 'redux';

const rootReducer = combineReducers({
  ants: antsReducer,
  // status: gameReducer,
});

export type AppState = {
  ants: AntsState;
};

export default createStore(rootReducer,applyMiddleware(thunk));