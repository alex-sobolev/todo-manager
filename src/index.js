import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import './main.css';
import combinedReducer from './reducers';
import reducersTests from './reducers/tests';

reducersTests();

const store = createStore(combinedReducer);

class App extends React.Component {
    onDelBtnClick(id) {
        store.dispatch({
            type: 'DELETE_TODO',
            id
        });
    }

    onTodoClick(id) {
        store.dispatch({
            type: 'TOGGLE_TODO',
            id
        })
    }

    getVisibleTodos(todos, currentFilter) {
        switch(currentFilter) {
            case 'SHOW_ACTIVE':
                return todos.filter(todo => !todo.isCompleted);
            case 'SHOW_COMPLETED':
                return todos.filter(todo => todo.isCompleted);
            default:
                return todos;
        }
    }

    render() {
        const { todos, visibilityFilter } = this.props.appData;
        const visibleTodos = this.getVisibleTodos(todos, visibilityFilter);

        return (
            <ul>
                {
                    visibleTodos.map((todo, index) => (
                        <li
                            key={todo.id}
                            className = { `todo-item ${ todo.isCompleted ? 'todo-item-completed' : 'todo-item-active' }` }
                        >
                            <span
                                className = { `todo-header ${todo.isCompleted ? 'todo-item-completed' : '' }` }
                                onClick = { () => this.onTodoClick(todo.id) }
                            >
                                TODO # {index + 1}:
                            </span>
                            <span className='todo-text'>
                                {todo.text}
                            </span>
                            <button onClick={() => this.onDelBtnClick(todo.id)}>Delete this TODO</button>
                        </li>
                    ))
                }
            </ul>
        )
    }
}

const onInputChange = inputText => {
    store.dispatch({
        type: 'TEXT_ADDED',
        text: inputText
    });
};

const onBtnClick = () => {
    const id = store.getState().todos.length;
    const text = store.getState().currentText;

    store.dispatch({
        type: 'ADD_TODO',
        id,
        isCompleted: false,
        text
    })
};

const onDisplayTodosClick = filter => {
    store.dispatch({
        type: 'SET_VISIBILITY_FILTER',
        filter
    });
}

const getVisibilityFilter = () => store.getState().visibilityFilter;

const assignActiveFilterStatusIfNeeded = filter =>
    getVisibilityFilter() === filter ? 'filtering-btn-active' : '';

const render = () => ReactDOM.render(
    <div>
        <input
            type='text'
            value={store.getState().currentText ? store.getState().currentText : ''}
            onChange={event => onInputChange(event.target.value)}
        />
        <button onClick={() => onBtnClick()}>Add TODO</button>
        <div className='filtering-btn-container'>
            <button
                className = { `filtering-btn-all ${assignActiveFilterStatusIfNeeded('SHOW_ALL')}` }
                onClick = {() => onDisplayTodosClick('SHOW_ALL')}
            >
                Show All TODOs
            </button>
            <button
                className = { `filtering-btn-comleted ${assignActiveFilterStatusIfNeeded('SHOW_COMPLETED')}` }
                onClick = {() => onDisplayTodosClick('SHOW_COMPLETED')}
            >
                Show completed TODOs
            </button>
            <button
                className = { `filtering-btn-active-todos ${assignActiveFilterStatusIfNeeded('SHOW_ACTIVE')}` }
                onClick = {() => onDisplayTodosClick('SHOW_ACTIVE')}
            >
                Show uncompleted TODOs
            </button>
        </div>
        <App
            appData={store.getState()}
        />
    </div>,
    document.getElementById('root')
);

render();

store.subscribe(render);
