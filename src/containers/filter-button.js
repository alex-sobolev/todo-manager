
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import actions from '../actions';


class FilterButton extends React.Component {
    render() {
        return (
            <button
                className = {`filtering-btn-all ${this.props.filterType === this.props.visibilityFilter ? 'filtering-btn-active' : ''}`}
                onClick = {() => this.props.setVisibilityFilter(this.props.filterType)}
            >
                {this.props.buttonName}
            </button>
        );
    }
}

const mapStateToProps = state => ({
    visibilityFilter: state.visibilityFilter
});

const matchDispatchToProps = dispatch =>
    bindActionCreators({
        setVisibilityFilter: actions.setVisibilityFilter
    }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(FilterButton);