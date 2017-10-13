import todoSpec from './todo-spec';
import todosSpec from './todos-spec';
import currentTextSpec from './current-text-spec';
import visibilityFilterSpec from './visibility-filter-spec';


const runTests = () => {
    todoSpec();
    todosSpec();
    currentTextSpec();
    visibilityFilterSpec();

    console.log('All unit tests passed!');
};

export default runTests;
