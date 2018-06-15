import React from 'react';
import Modal from 'react-responsive-modal';
import {Glyphicon, Button} from 'react-bootstrap'
import './css/PopUpPageInfo.css'

class PopUpPageInfo extends React.Component {
    constructor() {//Can have a state due to that it only handles local state about a image...
        super()
        this.state = {
            open: true
        }
    }

    onOpenModal = () => {
        this.setState({open: true});
        localStorage.setItem(this.props.whatPage, "false");
    };

    onCloseModal = () => {
        this.setState({open: false});
        localStorage.setItem(this.props.whatPage, "true");
    };

    favoritePage = () => {
        let text = <div><h2 id="popupTextTitle">Hello {this.props.username}</h2>
            <p id="popupText">In this page you can add movies that are your favorites, this is done by going to a movie
                page
                then adding that movie to your favorites by clicking on the button "<Glyphicon glyph="heart"/> Add
                Favorite"</p>
            <p id="popupText">After you have added movies to your favorite list then you can click on the Visualisation
                button for seeing recommend movies that area movies that you may like. Our algorithm will show you which of your favorite movies are
                similar then you can check out your favorites similar movies.</p>
        </div>
        return text
    };

    visualisationPage = () => {
        let text = <div><h2 id="popupTextTitle">Hello {this.props.username}</h2>
            <p id="popupText">
                In this visualisation page a graph will be plotted for you based on the movies in your favorite list,
                you can then see how similar movies to those in your favorite list correlate to each other. If there
                is an edge between for example two movies than there is a high chance you will find a movie that you
                highly will enjoy in one of those favorite movies similar list.
            </p>
            <p id="popupText">
                If you can click on the movie poster in the graph, then the title and overview of that movie will be
                shown, if you want to see more information of a that movie then just click on the title. Then a new tab
                with that movie will open.
            </p>
        </div>
        return text
    };

    firstLoginPage = () => {
        let text = <div><h2 id="popupTextTitle">Hello {this.props.username}</h2>
            <p id="popupText">Welcome to our website, in this website you can search for movies and see all the necessary
                information about a particular movie, add movies to your own favorite list, by clicking on
                the button "<Glyphicon glyph="heart"/> Add Favorite", in a movie page</p>
            <p id="popupText">
                You can search in the textbox "Search Movie Title... " for movies by their title and in the text box
                "Select genres" movies based on the genres you choose will be shown.
            </p>
        </div>
        return text
    }

    checkPopupType = (text) =>{
        switch(text) {
            case 'favoritePage':
                return this.favoritePage();
            case 'visualizationPage':
                return this.visualisationPage();
            case 'firstLoginPage':
                return this.firstLoginPage();
            default:
                return null;
        }
    }

    render() {
        return (
            <div>
                {this.props.whatPage==='favoritePage' ?
                <Glyphicon glyph="info-sign" onClick={this.onOpenModal}/>: null}
                {!JSON.parse(localStorage.getItem(this.props.whatPage)) ?
                    <Modal
                        open={this.state.open}
                        onClose={this.onCloseModal}
                        center
                        classNames={{
                            transitionEnter: 'transition-enter',
                            transitionEnterActive: 'transition-enter-active',
                            transitionExit: 'transition-exit-active',
                            transitionExitActive: 'transition-exit-active',
                        }}
                        animationDuration={1000}>
                        {this.checkPopupType(this.props.whatPage)}
                    </Modal>:<div/>}
            </div>
        );
    }
}

export default PopUpPageInfo;
