import React from 'react'
import {compose} from "redux";
import {firebaseConnect, firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {withHandlers} from "recompose";
// import App from "./components/App";

const enhance = compose(
    firebaseConnect(),
    connect(
        ({firebase: {auth, profile}}) => ({auth, profile})
    ),
    withHandlers({
        onLogin: props => () => {
            console.log('props', props);
            props.firebase.login({
                provider: 'google',
                type: 'popup'
            }).then(teste => {
                console.log('teste', teste);
            })


        },
        onLogout: props => () => {
            props.firebase.logout();
        }
    })
)
const LoginContainer = ({onLogin, onLogout, profile,auth}) => (
    <div>Login aqui {profile.displayName}
        <button onClick={onLogin}>login</button>
        <button onClick={onLogout}>logout?</button>

        {!auth.isEmpty && auth.isLoaded && (<div>logado</div>)}
    </div>
);

export default enhance(LoginContainer)

