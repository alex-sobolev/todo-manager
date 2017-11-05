import todo from './todo';


const todos = (state = [], action) => {
    switch(action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(null, action)
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

export default todos;
