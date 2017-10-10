import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import './main.css';


const todo = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                isCompleted: action.isCompleted,
                text: action.text
            };

        case 'TOGGLE_TODO':
            if (state.id === action.id) {
                return {
                    ...state,
                    isCompleted: !state.isCompleted
                };
            }
            return state;

        default:
            return state;
    }
};

const todos = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];

        case 'DELETE_TODO':
            return state.length < 2 ? []
                : [
                    ...state.slice(0, action.id),
                    ...state.slice(action.id + 1)
                ].map((todo, index) => ({
                        ...todo,
                        id: index
                    })
                );

        case 'TOGGLE_TODO':
            return state.map(todoItem => todo(todoItem, action));

        default:
            return state;
    }
};

const currentText = (state = null, action) => {
    switch(action.type) {
        case 'TEXT_ADDED':
            return action.text;
        
        case 'ADD_TODO':
            return null;

        default:
            return state;
    }
};

const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch(action.type) {
        case 'SET_VISIBILITY_FILTER':
            return action.filter;

        default:
            return state;
    }
};

const todosApp = combineReducers({
    todos,
    currentText,
    visibilityFilter
});

const store = createStore(todosApp);

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

    render() {
        const visibilityFilter = this.props.appData.visibilityFilter;
        const shouldHide = todo => {
            const shouldHideCompleted = todo.isCompleted && visibilityFilter === 'UNCOMPLETED_ONLY';
            const shouldHideUncompleted = !todo.isCompleted && visibilityFilter === 'COMPLETED_ONLY';

            return shouldHideCompleted || shouldHideUncompleted ? true : false;
        };

        return (
            <ul>
                {
                    this.props.appData.todos.map(todo => (
                        <li
                            key={todo.id}
                            className = { `todo-item ${ shouldHide(todo) ? 'todo-item-hidden' : '' }` }
                        >
                            <span
                                className = { `todo-header ${todo.isCompleted ? 'todo-item-completed' : '' }` }
                                onClick={() => this.onTodoClick(todo.id)}
                            >
                                TODO # {todo.id + 1}:
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
                className = 'filtering-btn-all'
                onClick = {() => onDisplayTodosClick('SHOW_ALL')}
            >
                Show All TODOs
            </button>
            <button
                className = 'filtering-btn-all'
                onClick = {() => onDisplayTodosClick('COMPLETED_ONLY')}
            >
                Show completed TODOs
            </button>
            <button
                className = 'filtering-btn-all'
                onClick = {() => onDisplayTodosClick('UNCOMPLETED_ONLY')}
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


// Unit Tests
const testAddTODO = () => {
    const action = {
        type: 'ADD_TODO',
        id: 0,
        isCompleted: false,
        text: 'Learn FP!'
    };

    const beforeTodo = [];

    const afterTodo = [
            {
                id: 0,
                isCompleted: false,
                text: 'Learn FP!'
            }
        ];

    deepFreeze(beforeTodo);
    deepFreeze(action);

    expect(
        todos(beforeTodo, action)
    ).toEqual(afterTodo);
};

const testDeleteTodo = () => {
    const action = {
        type: 'DELETE_TODO',
        id: 0
    };
    
    const stateBefore =  [
        {
            id: 0,
            isCompleted: false,
            text: 'Learn FP!'
        },
        {
            id: 1,
            isCompleted: false,
            text: 'Seriously you must learn FP!'
        }
    ];

    const stateAfter = [
        {
            id: 0,
            isCompleted: false,
            text: 'Seriously you must learn FP!'
        }
    ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};

const testToggleTodo = () => {
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    };

    const stateBefore = [
            {
                id: 0,
                isCompleted: false,
                text: 'Learn FP!'
            },
            {
                id: 1,
                isCompleted: false,
                text: 'Seriously you must learn FP!'
            }
        ];

    const stateAfter = [
            {
                id: 0,
                isCompleted: false,
                text: 'Learn FP!'
            },
            {
                id: 1,
                isCompleted: true,
                text: 'Seriously you must learn FP!'
            }
        ];

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter);
};

const testVisibilityFilter = () => {
    const stateBefore = 'SHOW_ALL';
    const action = {
        type: 'SET_VISIBILITY_FILTER',
        filter: 'COMPLETED_ONLY'
    };
    const stateAfter = 'COMPLETED_ONLY';

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        visibilityFilter(stateBefore, action)
    ).toEqual(stateAfter);
};

const runUnitTests = () => {
    testAddTODO();
    testDeleteTodo();
    testToggleTodo();
    testVisibilityFilter();
    console.log('All tests passed!');
};

runUnitTests();
