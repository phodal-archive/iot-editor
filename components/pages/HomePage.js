import React from 'react';
import MQTT from '../protocols/mqtt.js';

class HomePage extends React.Component {
	render() {

		return (
			<div>
				<MQTT />
			</div>
		);
	}
}

export default HomePage;
