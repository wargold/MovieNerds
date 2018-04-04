import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getCastInfoByID, getCastKnownMovies} from '../actions';
import {Image} from 'react-bootstrap';
import {LOADING_SPINNER} from '../constants/constants';
import CastInfo from '../components/castInfo';
import SearchBar from './searchBar';
import MoviesByGenres from './moviesByGenres';

class Cast extends Component {

    componentWillMount() {
        console.log("Check param id",this.props.match.params.id);
        const id=this.props.match.params.id;
        this.props.getCastInfoByID(id);
        this.props.getCastKnownMovies(id);
    }

    render() {
        console.log("Kolla cast Info", this.props.castAbout);
        console.log("Kolla castlist", this.props.castKnownMovies);


        const de = this.props.castAbout !== undefined && this.props.castKnownMovies!==undefined &&
        this.props.castKnownMovies.length>0?
            (<CastInfo castInfo={this.props.castAbout} moviesKnown={this.props.castKnownMovies}/>)
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
        castAbout: state.castAbout.info,
        castKnownMovies: state.castKnownMovies.info
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getCastInfoByID: getCastInfoByID,
        getCastKnownMovies: getCastKnownMovies
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Cast);