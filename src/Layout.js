import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'
import Posts from "./components/Posts";
import PostsContainer from "./containers/PostsContainer";
import LoginContainer from "./containers/LoginContainer";
import {compose} from "redux";
import {connect} from "react-redux";
import {firebaseConnect} from "react-redux-firebase";
import {withHandlers} from "recompose";



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

const IfLoggedIn = ({auth, children}) =>(!auth.isEmpty && auth.isLoaded && children);

const Layout = ({auth}) => (
    <Router>
        <div className='container'>
            <div className='header'>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <IfLoggedIn auth={auth}>
                        <li><Link to="/statistics">About</Link></li>
                        <li><Link to="/author/adriano">Topics</Link></li>
                        <li><Link to="/post">Post</Link></li>
                        <li><Link to="/protected">Add one</Link></li>
                        <li><Link to="/react">React</Link></li>
                    </IfLoggedIn>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </div>
            <div className='content'>
                <Switch>
                    <Route exact path="/" component={PostsContainer}/>
                    <Route path="/statistics" component={Posts}/>
                    <Route path="/login" component={LoginContainer}/>
                    <Route path="/about" component={Posts}/>
                    <Route path="/new" component={Posts}/>
                    <Route path="/authors/:nick" component={Posts}/>
                    <Route path="/:category" component={Posts}/>
                </Switch>
            </div>

        </div>
    </Router>
);

export default enhance(Layout)