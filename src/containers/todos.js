import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';

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
                        <li
                            key={todo.id}
                            className = { `todo-item ${ todo.isCompleted ? 'todo-item-completed' : 'todo-item-active' }` }
                        >
                            <span
                                className = 'todo-header'
                                onClick = { () => this.props.toggleTodo(todo.id) }
                            >
                                TODO # {index + 1}:
                            </span>
                            <span className='todo-text'>
                                {todo.text}
                            </span>
                            <button onClick={() => this.props.deleteTodo(todo.id)}>Delete this TODO</button>
                        </li>
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
