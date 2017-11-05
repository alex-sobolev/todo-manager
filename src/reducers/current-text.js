const currentText = (state = null, action) => {
    switch(action.type) {
        case 'TEXT_ADDED':
            return action.text;

        case 'ADD_TODO':
            return null;

        default:
            return state;
    }
};

export default currentText;
