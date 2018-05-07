import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getCastInfoByID, getCastKnownMovies} from '../actions';
import CastInfo from '../components/castInfo';
import NavBarHeader from './navbar';
import {Loader} from '../../loader/loader'
import history from '../history';

class Cast extends Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getCastInfoByID(id);
        this.props.getCastKnownMovies(id);
    }

    render() {
        if (this.props.castAboutError !== null || this.props.castKnownMoviesError !== null) {
            history.push('/APIError');
        }
        const de = this.props.castAbout !== undefined && this.props.castKnownMovies !== undefined &&
        this.props.castKnownMovies.length > 0 ?
            (<CastInfo castInfo={this.props.castAbout} moviesKnown={this.props.castKnownMovies}/>)
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
        castAbout: state.castAbout.info,
        castAboutError: state.castAbout.error,
        castKnownMovies: state.castKnownMovies.info,
        castKnownMoviesError: state.castKnownMovies.error
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getCastInfoByID: getCastInfoByID,
        getCastKnownMovies: getCastKnownMovies
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Cast);
