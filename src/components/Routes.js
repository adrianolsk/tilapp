import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter,
    Switch
} from 'react-router-dom'

import App from "./App";
import Posts from "./Posts";

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
firebase.initializeApp({
    apiKey: 'AIzaSyCeLIrZiDHiOa8VQFPtqitSef-0YSoC_Eg',
    authDomain: 'tillapp-11960.firebaseapp.com',
    projectId: 'tillapp-11960'
});
const db = firebase.firestore();

//id: 380129346064-mjdepid7uvsdoq30hm1qb395nlqnl8lf.apps.googleusercontent.com
//key: dm_Wc4ZdH8CHOFTIY6ghIAZC
const provider = new firebase.auth.GoogleAuthProvider();
firebase.auth().languageCode = 'pt';

const Protected = () => (
    <div>
        <h2>Protected</h2>
    </div>
)
const Home = () => (
    <div>
        <h2>Home</h2>
    </div>
)

class About extends React.Component {

    constructor() {
        super();
        this.state = {
            lista: [],
            user: {}
        }
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    //example
    // async componentWillMount() {
    //     try {
    //         const snapshot = await db.doc(`cars`).get();
    //         console.log('snap', snapshot);
    //         if (snapshot.exists) {
    //             this.data = snapshot.data();
    //         }
    //     } catch(e) {
    //         // There can be some extra error processing
    //     }
    //     this.loading = false;
    // }

    componentDidMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                console.log('logado', user)
                this.setState({
                    user
                })
                // User is signed in.
            } else {
                console.log('non logado', 0);
                this.setState({
                    user: {}
                })
                // No user is signed in.
            }
        });

        this.unsubscribe = db.collection("cars").orderBy("placa").startAfter(1)
            .limit(1)
            .onSnapshot((querySnapshot) => {
                let lista = [];
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    lista.push(doc.data())
                });
                this.setState({
                    lista
                });
            });

        // db.collection("cars").get().then( (querySnapshot)=> {
        //     let lista = [];
        //     querySnapshot.forEach(function (doc) {
        //         console.log(doc.id, " => ", doc.data());
        //         lista.push(doc.data())
        //     });
        //     this.setState({
        //         lista
        //     });
        // });
    }

    logout = () => {
        firebase.auth().signOut();
    }
    login = () => {

        firebase.auth().signInWithPopup(provider).then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(result);
            // ...
        }).catch((error) => {
            console.log(error);
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
        });
    }

    render() {
        const {lista, user} = this.state;
        return (
            <div>
                <h2>About</h2>
                <pre>
                {lista.map((item, index) => (
                    <div key={index}>
                        {JSON.stringify(item, null, 2)}
                    </div>
                ))}
                </pre>
                <button onClick={this.login}>login</button>
                <button onClick={this.logout}>sair</button>
                <img src={user.photoURL} alt=""/>
                <pre>USer: {JSON.stringify(user, null, 2)}</pre>
            </div>
        )
    }
}
export {About};
const
    Topic = ({match}) => (
        <div>
            <h3>{match.params.topicId}</h3>
        </div>
    )

const
    Topics = ({match}) => (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${match.url}/rendering`}>
                        Rendering with React
                    </Link>
                </li>
                <li>
                    <Link to={`${match.url}/components`}>
                        Components
                    </Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>
                        Props v. State
                    </Link>
                </li>
            </ul>

            <Route path={`${match.url}/:topicId`} component={Topic}/>
            <Route exact path={match.url} render={() => (
                <h3>Please select a topic.</h3>
            )}/>
        </div>
    )


const fakeAuth = {
    isAuthenticated: true,
    authenticate(cb) {
        this.isAuthenticated = true
        setTimeout(cb, 100) // fake async
    },
    signout(cb) {
        this.isAuthenticated = false
        setTimeout(cb, 100)
    }
}
const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={props => (
        fakeAuth.isAuthenticated ? (
            <Component {...props}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
        )
    )}/>
)

class PrivateRoute2 extends React.Component {

    constructor() {
        super();
        this.state = {
            isChecking: true,
            isAuthenticated: false,


        }
    }

    componentDidMount() {
        const user = firebase.auth().currentUser;
        if (user) {
            console.log('Ja estava logado');
            this.setState({
                user,
                isAuthenticated: true,
                isChecking: false
            });
        }
        else {
            console.log('nao logado, verificando',);
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    console.log('logado', user)
                    this.setState({
                        user,
                        isAuthenticated: true,
                        isChecking: false
                    })
                    // resolve(true)
                    // User is signed in.
                } else {
                    console.log('nao logado', 0)
                    // resolve(false)
                    this.setState({
                        user: {},
                        isAuthenticated: false,
                        isChecking: false
                    })

                }
            });
        }
    }

    render() {
        const {component: Component, ...rest} = this.props;
        const {isAuthenticated, isChecking} = this.state;
        return (
            <Route {...rest} render={props => (
                isChecking ? ('') :
                    isAuthenticated ? (
                        <Component {...props}/>
                    ) : (
                        <Redirect to={{
                            pathname: '/About',
                            state: {from: props.location}
                        }}/>
                    )
            )}/>
        )
    }
}


const
    BasicExample = () => (
        <Router>
            <div>
                <ul>
                    <li><Link to="/">Posts</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/topics">Topics</Link></li>
                    <li><Link to="/post">Post</Link></li>
                    <li><Link to="/protected">protected</Link></li>
                    <li><Link to="/react">Posts</Link></li>
                </ul>

                <hr/>

                <Switch>
                    <Route exact path="/" component={Posts}/>
                    <Route path="/about" component={About}/>
                    <Route path="/topics" component={Topics}/>
                    <Route path="/post" component={App}/>
                    <PrivateRoute path="/protected" component={Protected}/>
                    <PrivateRoute path="/protected2" component={Topics}/>

                    <Route path="/authors/:name" component={Posts}/>
                    <Route path="/:category" component={Posts}/>

                </Switch>
            </div>
        </Router>
    )
export default BasicExample