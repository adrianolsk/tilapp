import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'
import Posts from "./components/Posts";
import PostsContainer from "./containers/PostsContainer";
// import App from "./components/App";


const Layout = () => (
    <Router>
        <div className='container'>
            <div className='header'>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/statistics">About</Link></li>
                    <li><Link to="/author/adriano">Topics</Link></li>
                    <li><Link to="/post">Post</Link></li>
                    <li><Link to="/protected">Add one</Link></li>
                    <li><Link to="/react">React</Link></li>
                </ul>
            </div>
            <div className='content'>
                <Switch>
                    <Route exact path="/" component={PostsContainer}/>
                    <Route path="/statistics" component={Posts}/>
                    <Route path="/about" component={Posts}/>
                    <Route path="/new" component={Posts}/>
                    <Route path="/authors/:nick" component={Posts}/>
                    <Route path="/:category" component={Posts}/>
                </Switch>
            </div>

        </div>
    </Router>
);

export default Layout