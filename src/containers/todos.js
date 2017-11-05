import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import Todo from '../components/todo';

const getVisibleTodos = (todos, currentFilter) => {
    switch(currentFilter) {
        case 'SHOW_ACTIVE':
            return todos.filter(todo => !todo.isCompleted);
        case 'SHOW_COMPLETED':
            return todos.filter(todo => todo.isCompleted);
        default:
            return todos;
    }
};

class Todos extends React.Component {
    render() {
        const visibleTodos = getVisibleTodos(this.props.todos, this.props.visibilityFilter);

        return (
            <ul>
                {
                    visibleTodos.map((todo, index) => (
                        <Todo
                            key={todo.id}
                            onTodoClick = { () => this.props.toggleTodo(todo.id) }
                            onDeleteTodoClick = { () => this.props.deleteTodo(todo.id) }
                            index = { index }
                            todo = { todo }
                        />
                    ))
                }
            </ul>
        )
    }
}

const mapStateToProps = state => ({
    todos: state.todos,
    visibilityFilter: state.visibilityFilter
});

const matchDispatchToProps = dispatch =>
    bindActionCreators({
        deleteTodo: actions.deleteTodo,
        toggleTodo: actions.toggleTodo
    }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Todos);
