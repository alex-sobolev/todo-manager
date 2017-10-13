import todos from '../todos';
import expect from 'expect';
import deepFreeze from 'deep-freeze';

const testAddTodo = () => {
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

const testTodos = () => {
    testAddTodo();
    testDeleteTodo();
    testToggleTodo();
};

export default testTodos;
