import React from 'react'
import {Provider} from 'react-redux'
import configureStore from './store'
import Layout from "./Layout";


const initialState = window.__INITIAL_STATE__ || {firebase: {authError: null}};
const store = configureStore(initialState);

export default () => (
    <Provider store={store} >
        <Layout/>
    </Provider>
)