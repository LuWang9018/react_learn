import React from 'react';
import ReactDOM from 'react-dom';
import { hot } from 'react-hot-loader'
import { AppContainer } from 'react-hot-loader'
import Voting from './components/Voting';

const pair = ['Trainspotting', '28 Days Later'];

ReactDOM.render(
  <Voting pair={pair} />,
  document.getElementById('app')
);

if (module.hot) {
    module.hot.accept('./print.js', function() {
    	console.log('Accepting the updated printMe module!');
    	printMe();
	})
}

const App = () => <div>Hello World!</div>

export default hot(module)(App)