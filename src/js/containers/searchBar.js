import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getSearchMovie, updateInputValue, clearSuggestions, setAuthenticated, notLoggedIn} from '../actions';
import history from '../history';
import Autosuggest from 'react-autosuggest';
import './css/searchBar.css';
import {URL_IMG, IMG_LOGO_XS_SIZE, BROKEN_IMAGE} from '../constants/constants';
import {DebounceInput} from 'react-debounce-input';


class SearchBar extends Component {

    onChange = (event, {newValue, method}) => {
        this.props.updateInputValue(newValue);
    };

    handleKeyDown = (event) => {
        if (event.key == 'Enter') {
            return this.handleSubmit(this.props.getse.value);
        }
    };

    handleSubmit = (searchText) => {
        console.log(searchText);
        this.props.updateInputValue('');
    };

    getSuggestionValue = (suggestion) => {
        return suggestion.title;
    };

    onSuggestionsFetchRequested = ({value}) => {
        if (value.length > 0 && value.replace(/\s/g, '').length > 0) {
            this.props.getsearch(value);
        }
        else {
            this.props.clearSuggestions();
        }
    };

    onSuggestionsClearRequested = () => {
        this.props.clearSuggestions();
    };

    renderSuggestion = (suggestion) => {

        return (
            <div className="divMovieSugg">
                <img className="searchResult-image loader"
                     src={suggestion.poster_path == null ? BROKEN_IMAGE : URL_IMG + IMG_LOGO_XS_SIZE + suggestion.poster_path}
                     alt={suggestion.title}/>
                <div className="searchResult-text">
                    <div className="searchResult-name">
                        {(suggestion.title.length <= 30) ? (suggestion.title) :
                            (suggestion.title.substring(0, 25).replace(/\s/g, '') + '...')}
                    </div>
                    {suggestion.release_date == null ? 1994 : suggestion.release_date.substring(0, 4)}
                </div>
            </div>
        );
    };


    onSuggestionSelected = (event, {suggestion, method}) => {
        if (method === 'enter') {
            event.preventDefault();
        }
        history.push('/movie/' + suggestion.id);
        this.props.updateInputValue('');
    };

    render() {

        console.log('Check data', this.props.getse.suggestions);

        const value = this.props.getse.value;
        console.log('kolla input value', value);
        let suggestions = this.props.getse.suggestions;
        if (suggestions === undefined) {
            suggestions = [];
        }

        const inputProps = {
            value,
            onChange: this.onChange,
            onKeyPress: this.handleKeyDown,
            placeholder: 'Search Movie Title...',
        };

        const renderSearchInput = (inputProps) => (
            <DebounceInput
                minLength={1}
                debounceTimeout={500}
                autoFocus
                {...inputProps}
            />
        );

        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionSelected={this.onSuggestionSelected}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={inputProps}
                renderInputComponent={renderSearchInput}/>
        );
    }
}

function mapStateToProps(state) {
    return {
        getse: state.search,
        selector: state.selections,
        authenticated: state.auth.authenticated,
        user: state.auth.user,
        loading: state.auth.loading,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getsearch: getSearchMovie,
        updateInputValue: updateInputValue,
        clearSuggestions: clearSuggestions,
        setAuthenticated: setAuthenticated,
        notLoggedIn: notLoggedIn,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
