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
        localStorage.setItem("favoritePageSeenByUser", "false");
    };

    onCloseModal = () => {
        this.setState({open: false});
        localStorage.setItem("favoritePageSeenByUser", "true");
    };

    render() {
        return (
            <div>
                    <Glyphicon glyph="info-sign" onClick={this.onOpenModal}/>
                {!JSON.parse(localStorage.getItem("favoritePageSeenByUser"))?
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
                animationDuration={1000}
            ><h2 id="popupTextTitle">Hello {this.props.username}</h2>
                <p id="popupText">In this page you can add movies that are your favorites, this is done by going to a movie page
                    then adding that movie to your favorites by clicking on the button "<Glyphicon glyph="heart"/> Add
                    Favorite"</p>
                <p id="popupText">After you have added movies to your favorite list then you can click on the Visualisation button for
                    super seeing a movies that you may like. Our algorithm will show you which of your favorite movies are
                    similar then you can check out your favorites similar movies.</p>
            </Modal>:<div/>}
            </div>
        );
    }
}

export default PopUpPageInfo;
