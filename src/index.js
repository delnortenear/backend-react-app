import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './serviceWorker';
import App from './App';
import Home from './components/Home';

const test = "test";

ReactDOM.render(
	<div>
	<App />
	</div>, document.getElementById('root'));

registerServiceWorker();

