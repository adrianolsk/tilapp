import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import RootApp from "./RootApp";

ReactDOM.render(RootApp(), document.getElementById('root'));
registerServiceWorker();
