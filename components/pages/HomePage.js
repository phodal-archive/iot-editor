import React from 'react';
let mui = require('material-ui');
let {
	Avatar,
	Card,
	CardActions,
	CardHeader,
	CardText,
	CardTitle,
	FlatButton,
	Snackbar,
	TextField
	} = mui;
let ipc = window.require('ipc');

class HomePage extends React.Component {
	constructor() {
		super();
		this.state = {
			autoHideDuration: 0,
			mqttServer: 'mqtt.phodal.com',
			mqttTopic: 'test',
			serverMessage: ''
		};

		this.handleRequestServer = this.handleRequestServer.bind(this);
		this.handleServerURLChange = this.handleServerURLChange.bind(this);
		this.handleServerTopicChange = this.handleServerTopicChange.bind(this);
	}

	handleServerURLChange(event) {
		this.setState({mqttServer: event.target.value});
	}

	handleServerTopicChange(event) {
		this.setState({mqttTopic: event.target.value});
	}

	render() {
		var mqttServer = this.state.mqttServer;
		var mqttTopic = this.state.mqttTopic;
		var serverMessage = this.state.serverMessage;

		return (
			<div>
				<Card initiallyExpanded={false}>
					<CardHeader
						title="MQTT"
						subtitle="Message Queuing Telemetry Transport，消息队列遥测传输"
						avatar={<Avatar style={{color:'red'}}>M</Avatar>}
						showExpandableButton={true}>
					</CardHeader>
					<CardActions expandable={true}>
						<TextField
							hintText="MQTT服务器"
							defaultValue={mqttServer}
							floatingLabelText="MQTT服务器"
							onChange={this.handleServerURLChange}
							/>
						<TextField
							hintText="Topic"
							defaultValue={mqttTopic}
							floatingLabelText="Topic"/>
					</CardActions>

					<CardActions expandable={true}>
						<TextField
							hintText="Hint Text (MultiLine)"
							floatingLabelText="Floating Label Text"
							multiLine={true}/>

						<FlatButton label="确定" secondary={true} onClick={this.handleRequestServer(this.state)}/>
					</CardActions>
				</Card>

				<Snackbar
					ref="snackbar"
					message={serverMessage}
					action="undo"
					autoHideDuration={this.state.autoHideDuration} />

				<Card initiallyExpanded={false}>
					<CardHeader
						title="CoAP"
						subtitle="Constrained Application Protocol，受限制应用协议"
						avatar={<Avatar style={{color:'red'}}>C</Avatar>}
						showExpandableButton={true}>
					</CardHeader>
					<CardActions expandable={true}>
						<TextField
							hintText="coap服务器"
							defaultValue="mqtt.phodal.com"
							floatingLabelText="CoAP服务器"
							onChange={this.handleServerURLChange}
							/>
						<TextField
							hintText="Topic"
							defaultValue="test"
							floatingLabelText="Topic"/>
					</CardActions>

					<CardActions expandable={true}>
						<TextField
							hintText="Hint Text (MultiLine)"
							floatingLabelText="Floating Label Text"
							multiLine={true}/>

						<FlatButton label="确定" secondary={true}/>
					</CardActions>
				</Card>
			</div>
		);
	}


	handleRequestServer(state) {
		var result = ipc.sendSync('mqtt', state);
		if(result.connected) {
			this.setState({serverMessage: 'connected successful'});
			this.refs.snackbar.show();
		}
		//
		//ipc.on('synchronous-mqtt', function(arg) {
		//	console.log(arg);
		//	self.refs.snackbar.show();
		//});
	}

}

export default HomePage;
