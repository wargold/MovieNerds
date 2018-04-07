import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    getMovieByMovieID, getTrailerByMovieID, getCastByMovieID, getSimilarMovies,
    resetSelectedValues
} from '../actions';
import {Image} from 'react-bootstrap';
import {LOADING_SPINNER} from '../constants/constants';
import MovieInfo from '../components/movieInfo';
import SearchBar from './searchBar';
import MoviesByGenres from './moviesByGenres';

class Movie extends Component {

    componentDidMount() {
        console.log("Check param id", this.props.match.params.id);
        this.load(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps){
        console.log("Compenent Update" );
        console.log("Previous params id length",nextProps.match.params.id);
        console.log("New value: length",this.props.match.params.id );
        if(nextProps.match.params.id !==this.props.match.params.id){
            console.log("Update kan göras");
            this.props.resetGenreValue();
            this.load(nextProps.match.params.id);
        }
    }

    load(hg){
        const id = hg;
        this.props.getMovieByMovieID(id);
        this.props.getTrailerByMovieID(id);
        this.props.getCastByMovieID(id);
        this.props.getSimilarMovies(id);
    }


    render() {
        console.log("Render" );
        console.log("Render" );
        console.log("Selector value:",this.props.selector.value);
        const de = this.props.movieInfo !== undefined && this.props.trailer !== undefined &&
        this.props.castList !== undefined && this.props.similarMovies !== undefined &&
        this.props.trailer.length > 0 && this.props.castList.length > 0 && this.props.similarMovies.length > 0 ?
            (<MovieInfo movie={this.props.movieInfo.movieInfo} trailer={this.props.trailer}
                        castList={this.props.castList} similarMovies={this.props.similarMovies}/>)
            : (<Image src={LOADING_SPINNER} style={{width: 100, height: 100}}/>);
        return (<div>
            <SearchBar/>
            {this.props.selector.value.length > 0 ?
                <MoviesByGenres/>
                :
                de
            }
        </div>)
    }
}

function mapStateToProps(state) {
    return {
        selector: state.selections,
        movieInfo: state.movieInfo,
        trailer: state.trailer.movieInfo,
        castList: state.castList.movieInfo,
        similarMovies: state.similarMovies.movieInfo
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getMovieByMovieID: getMovieByMovieID,
        getTrailerByMovieID: getTrailerByMovieID,
        getCastByMovieID: getCastByMovieID,
        getSimilarMovies: getSimilarMovies,
        resetGenreValue: resetSelectedValues
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Movie);