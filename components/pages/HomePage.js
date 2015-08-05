import React from 'react';

class HomePage extends React.Component {

	render() {
		var ipc = window.require('ipc');
		ipc.sendSync('serialPort', '');
		return (
			<div>HomePage</div>
		);
	}

}

export default HomePage;
