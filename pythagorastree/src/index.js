import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { AnimatedPythagorasTree } from './PythagorasTree.js'
import { getBoxStyle } from './PythagorasTree.js'

let totalLevels = 5;
let heightFactor = 0.37;
let lean = 0;
let size = 100;
let time = 0;

/*

--for test use


const square = React.createElement('div', {
	style: {
		width: '100px',
		height: '100px',
		backgroundColor: 'red',
		margin: '10px',
	}
})

const container = React.createElement(
	'div', 
	{
		style: {
			border: '5px solid blue',
		}
	},
	square,
	square,
)


const boxes = []
for(let i = 1; i <= 15; i++){
	let content = '';
	if (i % 3 === 0) content += 'Fizz'
	if (i % 5 === 0) content += 'Buzz'
	if (content === '') content = String(i)
	boxes.push(
		React.createElement('div', { style: getBoxStyle(i - 1), key: i }, content)
	)	
}
*/
const TreeBox = (props) => {
  const style = getBoxStyle(props)
  const baseProps = Object.assign({}, props, {
    level: props.level + 1,
  })

  const leftChild =
    props.level < totalLevels &&
    React.createElement(TreeBox, 
    	Object.assign({}, baseProps, {
    		right: false,
    	})
    )

  const rightChild =
    props.level < totalLevels &&
    React.createElement(TreeBox, 
    	Object.assign({}, baseProps, {
    		right: true,
    	})
    )
  return React.createElement('div', { style },
    leftChild,
    rightChild
  )
}

let animating = false
let sway = '0.1'

function setAndRerender(nextAnimating, nextSway) {
  animating = nextAnimating
  sway = nextSway
  renderApp()
}

const getSway = () => (sway === '' ? 0 : parseFloat(sway))

const toggle = () => setAndRerender(!animating, sway)
const decreaseSway = () => setAndRerender(animating, getSway() - 0.02)
const increaseSway = () => setAndRerender(animating, getSway() + 0.02)
const changeSway = (event) => setAndRerender(animating, event.target.value)
const setSway = (event) => setAndRerender(animating, event.target.value)

function renderApp() {
	const toggleText = `${animating ? 'Stop' : 'Start'} animation`
	ReactDOM.render(

		React.createElement('div',{id : 'tree'},
			React.createElement('div', { height: 100, width: 100},
				React.createElement(AnimatedPythagorasTree, 
					{ animating, sway: getSway() })
			),
			React.createElement('button', {onClick: toggle}, toggleText),
			React.createElement('h5', {}, 'amount of sway'),
			React.createElement('button', {onClick: decreaseSway}, '<'),
			React.createElement('input', {value: sway,
										  onChange: setSway}),
			React.createElement('button', {onClick: increaseSway}, '>') 
		),
		document.getElementById('app')
	)
}

renderApp()