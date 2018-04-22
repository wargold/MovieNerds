import React, {Component} from 'react';
import Select from 'react-select';
import './css/selectGenre.css';
import {connect} from "react-redux";
import {updateSelectedValues, getMovieGenres} from "../actions";
import {bindActionCreators} from 'redux';
import history from '../history'

const ASYNC_DELAY = 500;

class SearchByGenres extends Component {

    onChange = (value) => {
        console.log("Kolla value av genres", value);
        let gen = [];
        for (var i = 0; i < value.length; i++) {
            gen.push(value[i].id);
        }
        console.log("Kolla value av genres", gen);
        this.props.setValue(value);
        if (gen.length > 0) {
            history.push('/searchGenres/' + gen);
        } else {
            history.push('/');
        }
    };

    getContributors = (input, callback) => {
        let arr = [];
        Promise.all([this.props.getMovieGenres()]).then((res) => {
            res[0].data.map((elem) => {
                arr.push(elem);
            });
        }).catch((err) => {
            console.error(err)
        });

        console.log("Optionsss", arr);

        var options = arr;
        console.log("Options", options);
        var data = {
            options: options
        };
        setTimeout(function () {
            callback(null, data);
        }, ASYNC_DELAY);
    };

    render() {
        return (
            <div className="section">
                <Select.Async multi={this.props.selector.multi} value={this.props.selector.value}
                              onChange={this.onChange}
                              valueKey="name" labelKey="name"
                              placeholder="Select Genres" loadOptions={this.getContributors}/>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        selector: state.selections,
        genres: state.genres
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getMovieGenres: getMovieGenres,
        setValue: updateSelectedValues
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchByGenres);
