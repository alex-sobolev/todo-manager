const addTodo = (id, text) => ({
    type: 'ADD_TODO',
    isCompleted: false,
    id,
    text
});

const textAdded = inputText => ({
    type: 'TEXT_ADDED',
    text: inputText
});

const setVisibilityFilter = filter => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});

const deleteTodo = id => ({
    type: 'DELETE_TODO',
    id
});

const toggleTodo = id => ({
    type: 'TOGGLE_TODO',
    id
});

const actions = {
    addTodo,
    textAdded,
    setVisibilityFilter,
    deleteTodo,
    toggleTodo
};

export default actions;
