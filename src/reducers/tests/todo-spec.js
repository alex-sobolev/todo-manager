import todo from '../todo';
import expect from 'expect';
import deepFreeze from 'deep-freeze';


const testToggleTodo = () => {
    const action = {
        type: 'TOGGLE_TODO',
        id: 0
    };

    const stateBefore = {
        id: 0,
        isCompleted: false,
        text: 'Learn FP!'
    }

    const stateAfter = {
        id: 0,
        isCompleted: true,
        text: 'Learn FP!'
    };

    deepFreeze(stateBefore);
    deepFreeze(action);

    expect(
        todo(stateBefore, action)
    ).toEqual(stateAfter);
};

const runTests = () => {
    testToggleTodo();
};

export default runTests;
