import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getMovieByMovieID, getTrailerByMovieID, getCastByMovieID} from '../actions';
import {Image} from 'react-bootstrap';
import {LOADING_SPINNER} from '../constants/constants';
import MovieInfo from '../components/movieInfo';
import SearchBar from './searchBar';
import MoviesByGenres from './moviesByGenres';

class Movie extends Component {

    componentWillMount() {
        console.log("Check param id", this.props.match.params.id);
        const id = this.props.match.params.id;
        this.props.getMovieByMovieID(id);
        this.props.getTrailerByMovieID(id);
        this.props.getCastByMovieID(id);
    }


    render() {
        console.log("Kolla Movie", this.props.movieInfo);
        console.log("Kolla trailer", this.props.trailer);
        console.log("Kolla castlist", this.props.castList);

        const de = this.props.movieInfo.movieInfo !== undefined && this.props.trailer !== undefined &&
        this.props.castList !== undefined && this.props.trailer.length > 0 && this.props.castList.length > 0 ?
            (<MovieInfo movie={this.props.movieInfo.movieInfo} trailer={this.props.trailer}
                        castList={this.props.castList}/>)
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
        castList: state.castList.movieInfo
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getMovieByMovieID: getMovieByMovieID,
        getTrailerByMovieID: getTrailerByMovieID,
        getCastByMovieID: getCastByMovieID
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Movie);