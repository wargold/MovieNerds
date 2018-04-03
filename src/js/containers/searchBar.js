import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getSearchMovie, updateInputValue, clearSuggestions} from '../actions';
import {push} from 'react-router-redux'
import Autosuggest from 'react-autosuggest'
import {Panel} from 'react-bootstrap'
import './css/searchBar.css'
import {URL_IMG, IMG_LOGO_XS_SIZE, BROKEN_IMAGE} from '../constants/constants'
import Contributors from './selectGenre'
import MovieGenreList from './movieGenreList'
import MoviesByGenres from './moviesByGenres'


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
        this.props.dispatch(push('/search/' + searchText));
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
            <a>
                <img className="searchResult-image"
                     src={suggestion.poster_path == null ? BROKEN_IMAGE : URL_IMG + IMG_LOGO_XS_SIZE + suggestion.poster_path}
                     alt={"NO I"}/>
                <div className="searchResult-text">
                    <div className="searchResult-name">
                        {suggestion.title}
                    </div>
                    {suggestion.release_date.substring(0, 4)}
                </div>
            </a>
        );
    };


    onSuggestionSelected = (event, {suggestion, method}) => {
        if (method === 'enter')
            event.preventDefault();
        this.props.dispatch(push('/movie/' + suggestion.id));
        this.props.updateInputValue('');
    };

    render() {
        console.log("Check data", this.props.getse.suggestions);

        const value = this.props.getse.value;
        let suggestions = this.props.getse.suggestions;
        if (suggestions === undefined) {
            suggestions = [];
        }

        const inputProps = {
            value,
            onChange: this.onChange,
            onKeyPress: this.handleKeyDown,
            placeholder: 'Search Movie Title...'
        };


        return (
            <div>
                <Panel>
                    <Panel.Heading>
                        <Panel.Title>
                            <h2 className="homeTitle">{"The Home For All Movie Nerds Out There"}</h2>
                        </Panel.Title>
                    </Panel.Heading>
                    <Panel.Body>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionSelected={this.onSuggestionSelected}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={inputProps}/>
                        <Contributors/>
                    </Panel.Body>
                </Panel>
                {this.props.selector.value.length > 0 ?
                    <MoviesByGenres/>
                    :
                    <MovieGenreList/>
                }
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        getse: state.search,
        selector: state.selections,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getsearch: getSearchMovie,
        updateInputValue: updateInputValue,
        clearSuggestions: clearSuggestions
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);