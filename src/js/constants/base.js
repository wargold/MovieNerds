import Rebase from 're-base';
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyAQ_T88rr17F1-b7npjtDorvHZoMpbIDHI",
    authDomain: "movienerds-5269d.firebaseapp.com",
    databaseURL: "https://movienerds-5269d.firebaseio.com",
    projectId: "movienerds-5269d",
    storageBucket: "movienerds-5269d.appspot.com",
    messagingSenderId: "184218617520"
};


const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())
const facebookProvider = new firebase.auth.FacebookAuthProvider()
const database = firebase.database();
const auth = firebase.auth();

export {app, base, facebookProvider, database, auth}
