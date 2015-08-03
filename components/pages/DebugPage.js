import React from 'react';
import MQTT from '../protocols/mqtt.js';
import CoAP from '../protocols/coap.js';

class DebugPage extends React.Component {
	render() {

		return (
			<div>
				<MQTT />
				<CoAP />
			</div>
		);
	}
}

export default DebugPage;
