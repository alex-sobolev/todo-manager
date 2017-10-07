import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import expect from 'expect';
import deepFreeze from 'deep-freeze';
import './main.css';


const todoReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                isCompleted: action.isCompleted,
                text: action.text
            };

        case 'TOGGLE_TODO':
            return {
                ...state,
                isCompleted: !state.isCompleted
            };

        default:
            return state;
    }
};

const todosReducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return {
                    ...state,
                    todos: [
                        ...state.todos,
                        todoReducer(undefined, action)
                    ],
                    currentText: null
                };

        case 'DELETE_TODO':
            const isSingleOrEmptyTodo = state.todos.length < 2;
            const todosFromDel = isSingleOrEmptyTodo ? []
                : [
                    ...state.todos.slice(0, action.id),
                    ...state.todos.slice(action.id + 1)
                ].map((todo, index) => ({
                        ...todo,
                        id: index
                    })
                );

            return Object.assign({}, state, { todos: todosFromDel });

        case 'TEXT_ADDED':
            return Object.assign({}, state, {currentText: action.text});
        
        case 'TOGGLE_TODO':
            const todosFromToggle = state.todos.map(todo => {
                if (todo.id === action.id) {
                    return todoReducer(todo, action);
                }
                return todo;
            });

            return Object.assign({}, state, { todos: todosFromToggle });

        default:
            return state;
    }
};

const initialState = {
    todos: [],
    currentText: null
};

const store = createStore(todosReducer, initialState);

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
        return (
            this.props.appData.todos.map(todo => (
                <div key={todo.id} className='todo-item'>
                    <h2
                        className = { todo.isCompleted ? 'todo-item-completed' : '' }
                        onClick={() => this.onTodoClick(todo.id)}
                    >
                        TODO {todo.id + 1}
                    </h2>
                    <div>
                        {todo.text}
                    </div>
                    <button onClick={() => this.onDelBtnClick(todo.id)}>Delete this TODO</button>
                </div>
            ))
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

const render = () => ReactDOM.render(
    <div>
        <App
            appData={store.getState()}
        />
        <input
            type='text'
            value={store.getState().currentText ? store.getState().currentText : ''}
            onChange={event => onInputChange(event.target.value)}
        />
        <button onClick={() => onBtnClick()}>Add TODO</button>
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

    const beforeTODO = {todos:[], currentText: null};
    const afterTODO = {
        todos: [
            {
                id: 0,
                isCompleted: false,
                text: 'Learn FP!'
            }
        ],
        currentText: null
    };

    deepFreeze(beforeTODO);
    deepFreeze(action);

    expect(
        todosReducer(beforeTODO, action)
    ).toEqual(afterTODO);
};

const testDeleteTodo = () => {
    const action = {
        type: 'DELETE_TODO',
        id: 0
    };
    
    const stateBefore = {
        todos: [
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
        ],
        currentText: null
    };

    const stateAfter = {
        todos: [
            {
                id: 0,
                isCompleted: false,
                text: 'Seriously you must learn FP!'
            }
        ],
        currentText: null
    }

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todosReducer(stateBefore, action)
    ).toEqual(stateAfter);
};

const testToggleTodo = () => {
    const action = {
        type: 'TOGGLE_TODO',
        id: 1
    };

    const stateBefore = {
        todos: [
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
        ],
        currentText: null
    };

    const stateAfter = {
        todos: [
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
        ],
        currentText: null
    }

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todosReducer(stateBefore, action)
    ).toEqual(stateAfter);
};

const runUnitTests = () => {
    testAddTODO();
    testDeleteTodo();
    testToggleTodo();
    console.log('All tests passed!');
};

runUnitTests();
