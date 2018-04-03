import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getMoviesByGenres} from '../actions';
import MoviesListByGenres from '../components/moviesListByGenre';
import {Image} from 'react-bootstrap';
import {LOADING_SPINNER} from '../constants/constants'

class MoviesByGenres extends Component {

    componentWillMount() {
        this.loadData();
    }

    componentDidUpdate(prevProps, preState) {
        if (prevProps.selector.value.length !== this.props.selector.value.length) {
            this.loadData();
        }
    }


    loadData() {
        const lenOfGenres = this.props.selector.value.length;
        let gen = '';
        for (var i = 0; i < lenOfGenres; i++) {
            gen += this.props.selector.value[i].id.toString();
            if (i !== (lenOfGenres - 1)) {
                gen += ',';
            }
        }
        console.log("Kolla genres värdet: ", gen);
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('This happens 5th (after 3 seconds).');
                resolve(this.props.getMoviesByGenres(gen));
            }, 3000);
        });
        return promise;
    }

    render() {
        console.log("Kolla props: ", this.props.moviesByGenres.moviesByGenres);
        if(this.props.moviesByGenres.moviesByGenres!==null && this.props.moviesByGenres.moviesByGenres.length>0) {
            return (<MoviesListByGenres movies={this.props.moviesByGenres.moviesByGenres} genres={this.props.selector.value}/>)
        }else return(<Image src={LOADING_SPINNER}  style={{width: 100, height:100 }}/>)
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