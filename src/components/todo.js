import React from 'react';

const Todo = ({
    onTodoClick,
    onDeleteTodoClick,
    index,
    todo
}) => (
    <li
        className = { `todo-item ${ todo.isCompleted ? 'todo-item-completed' : 'todo-item-active' }` }
    >
        <span
            className = 'todo-header'
            onClick = { onTodoClick }
        >
            TODO # {index + 1}:
        </span>
        <span className='todo-text'>
            {todo.text}
        </span>
        <button onClick={ onDeleteTodoClick }>Delete this TODO</button>
    </li>
);

export default Todo;
