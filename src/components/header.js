import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';
import FilterButton from './filter-button';


class Header extends React.Component {
    render() {
        return (
            <div className='app-header'>
                <input
                    type='text'
                    value={this.props.currentText ? this.props.currentText : ''}
                    onChange={event => this.props.textAdded(event.target.value)}
                />
                <button onClick={() => this.props.addTodo(this.props.todos.length, this.props.currentText)}>Add TODO</button>
                <div className='filtering-btn-container'>
                    <FilterButton
                        buttonName = 'Show All TODOs'
                        filterType = 'SHOW_ALL'
                    />
                    <FilterButton
                        buttonName = 'Show completed TODOs'
                        filterType = 'SHOW_COMPLETED'
                    />
                    <FilterButton
                        buttonName = 'Show uncompleted TODOs'
                        filterType = 'SHOW_ACTIVE'
                    />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    todos: state.todos,
    currentText: state.currentText,
});

const matchDispatchToProps = dispatch =>
    bindActionCreators({
        addTodo: actions.addTodo,
        textAdded: actions.textAdded,
    }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Header);
