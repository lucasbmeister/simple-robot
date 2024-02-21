import { useState } from 'react';

export function ControlRobot() {

	const [robot, setRobot] = useState('')
	function getRobot() {
		const eventSource = new EventSource('http://localhost:3000/api/robot/state');
		eventSource.onmessage = (event) => {
			setRobot(event.data) // event.data
		}
	
		eventSource.onerror = (event) => {
			console.log(event)
		}
	}

	return (
		<div>
			<h1>{robot}</h1>
			<button onClick={getRobot}>Get Robot</button>
		</div>
	)
}


