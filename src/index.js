import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import expect from 'expect';
import deepFreeze from 'deep-freeze';

const reducer = (state, action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return Object
                .assign(
                    {},
                    state,
                    {todos: [
                        ...state.todos,
                        {
                            id: action.id,
                            isCompleted: action.isCompleted,
                            text: action.text
                        }
                    ]},
                    {currentText: null}
                );

        case 'DELETE_TODO':
            const isSingleOrEmptyTodo = state.todos.length < 2;
            const todos = isSingleOrEmptyTodo ? []
                : [
                    ...state.todos.slice(0, action.id),
                    ...state.todos.slice(action.id + 1)
                ];

            if (!isSingleOrEmptyTodo) {
                todos.forEach((todo, index) => { todo.id = index });
            }

            return Object.assign({}, state, { todos });

        case 'TEXT_ADDED':
            return Object.assign({}, state, {currentText: action.text})

        default:
            return state;
    }
};

const initialState = {
    todos: [],
    currentText: null
};

const store = createStore(reducer, initialState);

class App extends React.Component {
    onDelBtnClick(id) {
        store.dispatch({
            type: 'DELETE_TODO',
            id
        });
    }

    render() {
        return (
            this.props.appData.todos.map(todo => (
                <div key={todo.id} className='todo-item'>
                    <h2>TODO {todo.id + 1}</h2>
                    <div>{todo.text}</div>
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
        <App appData={store.getState()} />
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
    deepFreeze(afterTODO);

    expect(
        reducer(beforeTODO, action)
    ).toEqual(afterTODO);

    console.log('All tests passed!');
};

testAddTODO();
