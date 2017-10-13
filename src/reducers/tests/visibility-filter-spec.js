import visibilityFilter from '../visibility-filter';
import expect from 'expect';
import deepFreeze from 'deep-freeze';


const testVisibilityFilter = () => {
    const stateBefore = 'SHOW_ALL';
    const action = {
        type: 'SET_VISIBILITY_FILTER',
        filter: 'SHOW_ACTIVE'
    };
    const stateAfter = 'SHOW_ACTIVE';

    deepFreeze(action);
    deepFreeze(stateBefore);

    expect(
        visibilityFilter(stateBefore, action)
    ).toEqual(stateAfter);
};

export default testVisibilityFilter;
