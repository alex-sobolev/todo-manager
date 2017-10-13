import currentText from '../current-text';
import expect from 'expect';
import deepFreeze from 'deep-freeze';

const testTextAddition = () => {
    const action = {
        type: 'TEXT_ADDED',
        text: 'New text'
    };
    const stateBefore = 'Old text';
    const stateAfter = 'New text';

    deepFreeze(action);
    deepFreeze(stateBefore);

    expect(
        currentText(stateBefore, action)
    ).toEqual(stateAfter);
};

const testTextClearanceOnAddTodo = () => {
    const action = {
        type: 'ADD_TODO'
    };
    const stateBefore = 'Some text here';
    const stateAfter = null;

    deepFreeze(action);
    deepFreeze(stateBefore);

    expect(
        currentText(stateBefore, action)
    ).toEqual(stateAfter);
};

const runTests = () => {
    testTextAddition();
    testTextClearanceOnAddTodo();
};

export default runTests;
