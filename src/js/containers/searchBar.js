import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {search} from '../actions';

class SearchBar extends Component {
    render() {
        const {search, value} = this.props;

        return (
            <input
                className="form-control"
                placeholder = "Search For A Movie"
                onChange={(e) => search(e.target.value)}
                value={value} />
        );
    }
}

function mapStateToProps({state}) {
    return {state};
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({search: search}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);