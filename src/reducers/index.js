import { combineReducers } from 'redux';
import todo from './todo';
import todos from './todos';
import currentText from './current-text';
import visibilityFilter from './visibility-filter';

const todosApp = combineReducers({
    todo,
    todos,
    currentText,
    visibilityFilter
});

export default todosApp;
