const todo = (state={}, action) => {
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

export default todo;
