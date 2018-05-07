import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getMoviesByGenres} from '../actions';
import MoviesListByGenres from '../components/moviesListByGenre';
import {Loader} from '../../loader/loader'
import NavBarHeader from './navbar';
import history from '../history'

class MoviesByGenres extends Component {

    componentDidMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps, preState) {
        if (prevProps.selector.value.length !== this.props.selector.value.length) {
            this.loadData();
        }
    }

    loadData() {
        if (this.props.selector.value !== '') {
            this.props.getMoviesByGenres(this.props.match.params.value);
        } else {
            history.push('/');
        }
    }

    render() {
        if (this.props.moviesByGenres.error !== null) {
            history.push('/APIError');
        }
        console.log("Kolla props av serach genres: ", this.props.selector);
        console.log("Kolla props: ", this.props.moviesByGenres.moviesByGenres);
        let moviesByGenres = this.props.moviesByGenres.moviesByGenres;
        const de = (moviesByGenres !== null && moviesByGenres.length >= 0 && this.props.moviesByGenres.isFetching === false) ?
            (<MoviesListByGenres movies={this.props.moviesByGenres.moviesByGenres} genres={this.props.selector.value}/>)
            : (Loader());
        return (<div>
            <NavBarHeader/>
            {de}
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        selector: state.selections,
        moviesByGenres: state.moviesByMultiGenre
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getMoviesByGenres: getMoviesByGenres
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(MoviesByGenres);
