import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {connect} from 'react-redux'
import {withHandlers} from 'recompose'
import {
    firestoreConnect,
    isLoaded,
    isEmpty
} from 'react-redux-firebase'
import TodoItem from './TodoItem'
import NewTodo from './NewTodo'
import './App.css'
import {firebase as firebaseConf} from './config'

const enhance = compose(
    firestoreConnect((props) => {
        console.log('PROPS', props);
        return [
            // Load todos from Firestore and keep in sync/realtime
            {collection: 'todos', where: ['done', '==', false]},
            {collection: 'posts'},
        ]
    }),
    connect(
        ({firestore}) => ({
            todos: firestore.ordered.todos,
            posts: firestore.ordered.posts,
        })
    ),
    // withHandlers({
    //     addTodo: props => () =>
    //         props.firestore.add('todos', { text: 'sample', done: false })
    // })
)

const Home = ({firestore, todos,posts = []}) => (
    <div className='App'>
        <div className='App-header'>
            <h2>firestore demo</h2>
        </div>
        <div className='App-todos'>
            <h4>
                Loaded From
                <span className='App-Url'>
          <a href={firebaseConf.databaseURL}>
            {firebaseConf.databaseURL}
          </a>
        </span>
            </h4>
            <h4>Todos List</h4>
            {
                !isLoaded(todos)
                    ? 'Loading'
                    : isEmpty(todos)
                    ? 'Todo list is empty'
                    : todos.map((todo) =>
                        <TodoItem key={todo.id} todo={todo}/>
                    )
            }
            <hr/>
            Lista de posts
            {posts.map(item => (
                <div key={item.userId}>{item.text}</div>
            ))}
            <NewTodo/>
        </div>
    </div>
)

Home.propTypes = {
    firestore: PropTypes.shape({ // from enhnace (withFirestore)
        add: PropTypes.func.isRequired,
    }),
    //addTodo: PropTypes.func.isRequired, // from enhance (withHandlers)
    todos: PropTypes.array
}

export default enhance(Home)