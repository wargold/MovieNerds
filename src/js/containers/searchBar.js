import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {getSearchMovie, updateInputValue, clearSuggestions} from '../actions';
import history from '../history'
import Autosuggest from 'react-autosuggest'
import {Panel, Glyphicon, Button} from 'react-bootstrap'
import './css/searchBar.css'
import {URL_IMG, IMG_LOGO_XS_SIZE, BROKEN_IMAGE} from '../constants/constants'
import SearchByGenres from './selectGenre'
import { Link } from 'react-router-dom'
import {DebounceInput} from 'react-debounce-input';

let debounce = require('lodash.debounce');

class SearchBar extends Component {

    constructor() {
        super();
    }

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

    loadSuggestions(value) {
        console.log("Kolla här VIKITGT", value);
        this.props.getsearch(value);
    }

    randomDelay() {
        return 300 + Math.random() * 1000;
    }

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
                <img className="searchResult-image loading"
                     src={suggestion.poster_path == null ? BROKEN_IMAGE : URL_IMG + IMG_LOGO_XS_SIZE + suggestion.poster_path}
                     alt={suggestion.title}/>
                <div className="searchResult-text">
                    <div className="searchResult-name">
                        {suggestion.title}
                    </div>
                    {suggestion.release_date==null ? 1994 : suggestion.release_date.substring(0, 4)}
                </div>
            </div>
        );
    };


    onSuggestionSelected = (event, {suggestion, method}) => {
        if (method === 'enter')
            event.preventDefault();
        history.push('/movie/'+suggestion.id);
        this.props.updateInputValue('');
    };

    render() {
        console.log("Check data", this.props.getse.suggestions);

        const value = this.props.getse.value;
        console.log("kolla input value", value);
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

        const renderSearchInput = (inputProps) => (
            <DebounceInput
                minLength={1}
                debounceTimeout={500}
                autoFocus
                {...inputProps}
            />
        );

        console.log("aseewf", this.props.authenticated)

        let loggin = this.props.authenticated ? (
            <div>
                <p>Signed in as: {this.props.user}</p>
                <Link to={'/logout'}>
                    <Button>
                        <Glyphicon glyph="log-out"/> Log Out
                    </Button>
                </Link>
                <Link to={'/myfavorites'}>
                <Button className="myfavorites">
                    <Glyphicon glyph="heart" /> My Favorites
                </Button>
                </Link>
            </div>
        ) : (
            <Link to={'/login'}>
                <Button>
                    <Glyphicon glyph="user"/> Login/Register
                </Button>
            </Link>
        );


        return (
            <div>
                <Panel>
                    <Panel.Heading>
                        <Link to={'/'}>
                            <Panel.Title>
                                <h2 className="homeTitle">{"The Home For All Movie Nerds Out There"}</h2>
                            </Panel.Title>
                        </Link>
                        {loggin}
                    </Panel.Heading>
                    <Panel.Body>
                        <div><h4>Search For A Movie Based On A Movie Title</h4></div>
                        <Autosuggest
                            suggestions={suggestions}
                            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                            onSuggestionSelected={this.onSuggestionSelected}
                            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                            getSuggestionValue={this.getSuggestionValue}
                            renderSuggestion={this.renderSuggestion}
                            inputProps={inputProps}
                            renderInputComponent={renderSearchInput}/>
                    </Panel.Body>
                    <Panel.Footer>
                        <div><h4>Search For A Movie Based On Movie Genres</h4></div>
                        <SearchByGenres/>
                    </Panel.Footer>
                </Panel>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        getse: state.search,
        selector: state.selections,
        authenticated: state.auth.authenticated,
        user: state.auth.user,
        loading: state.auth.loading
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