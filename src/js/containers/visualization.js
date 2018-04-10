import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {getSimilarMovies, updateAllMoviesGenres} from '../actions';
var Heap = require('heap');


class Vis extends Component {

    componentDidMount() {
        //Get all the similar movies from the favorite list
        Promise.all(favorite.map((elem)=>this.props.getSimilarMovies(elem).then(()=> this.props.similarMovies)))
            .then((d)=>this.props.updateAllMoviesGenres(d,d));
        }


    render() {
        if (this.props.updateMoviesByGenre.genres[0] !== undefined && this.props.updateMoviesByGenre.genres[0].length > 0){
            console.log("Kolla Array", this.props.updateMoviesByGenre.genres[0]);
            let temp=[];
            let heap = new Heap(function(a, b) {
                return a.id - b.id;
            })

            for (var i = 0; i < this.props.updateMoviesByGenre.genres[0].length; i++) {
                this.props.updateMoviesByGenre.genres[0][i].map((elem)=>{heap.push(elem)})
            }

            console.log("Kolla sixeddds", heap.size());
            let prev=0;
            while (heap.size()>1) {//Get all movies that at least occur in two times from the list of all similar movies
                // based on favorite movies list
                let pop1 = heap.pop();
                let peek2 = heap.peek();
                if (pop1.id === peek2.id && pop1.id !== prev.id && !favorite.includes(pop1.id)){
                    temp.push(pop1);
                    heap.pop();
                }
                prev=pop1;
            }
            console.log("Kolla gemensam lista,", temp);


           /* let heap = new Heap(function(a, b) {
                return a.id - b.id;
            });
            test.map((elem)=> heap.push(elem));
            console.log("heap size", heap.size());
            console.log("similarMovies size", test.length);
                */
        }
        return (<div><h2>Hej</h2></div>)
    }
}

function mapStateToProps(state) {
    return {
        similarMovies: state.similarMovies.movieInfo,
        updateMoviesByGenre: state.updateMoviesByGenre
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getSimilarMovies: getSimilarMovies,
        updateAllMoviesGenres: updateAllMoviesGenres
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Vis);


let favorite =[284054,284053];//Black panther and thor ragnarok

//let favorite =[284054,338970];//Black panther and tom raider