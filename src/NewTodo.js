import React from 'react'
import PropTypes from 'prop-types'
import {compose} from 'redux'
import {withStateHandlers, withHandlers} from 'recompose'
import {withFirestore} from 'react-redux-firebase'
import './App.css'

const enhance = compose(
    withFirestore, // firestoreConnect() can also be used
    // withStateHandlers(
    //     ({ initialVal = '' }) => ({
    //         inputVal: initialVal
    //     }),
    //     {
    //         teste: ({ inputVal })  => (e) => { alert(inputVal);   return {}},
    //         onInputChange: ({ inputVal }) => (e) => ({ inputVal: e.target.value }),
    //         resetInput: ({ inputVal }) => (e) => ({ inputVal: e.target.value })
    //     }
    // ),
    // withHandlers({
    //     addTodo: props => () =>
    //         props.firestore.add('todos', { text: props.inputVal || 'sample', done: false })
    // })
)

// const NewTodo = ({todos, addTodo, inputVal, onInputChange, resetInput, teste}) => (
//     <div>
//         <h4>New Todo</h4>
//         <input value={inputVal} onChange={onInputChange}/>
//         <button onClick={addTodo}>Add</button>
//         <button onClick={resetInput}>Cancel</button>
//         <button type='button' onClick={teste}>Teste</button>
//     </div>
// )

class NewT extends React.Component {


    constructor(){
        super();
        this.state = {
            inputVal: ''
        }
    }
    onInputChange = (e) => {
        this.setState({
            inputVal: e.target.value
        })

    }

    addTodo = () => {
        this.props.firestore.add('todos', { text: this.state.inputVal || 'sample', done: false })
    }

    resetInput = () => {
        debugger
    }

    teste = () => {
        debugger
    }

    render() {
        const {inputVal} = this.state;
        return (
            <div>
                <h4>New Todo</h4>
                <input value={inputVal} onChange={this.onInputChange}/>
                <button onClick={this.addTodo}>Add</button>
                <button onClick={this.resetInput}>Cancel</button>
                <button type='button' onClick={this.teste}>Teste</button>
            </div>
        )
    }
}
//
// NewT.propTypes = {
//     firestore: PropTypes.shape({ // from enhnace (withFirestore)
//         add: PropTypes.func.isRequired,
//     }),
//     addTodo: PropTypes.func.isRequired, // from enhance (withHandlers)
//     todos: PropTypes.array
// }

export default enhance(NewT)