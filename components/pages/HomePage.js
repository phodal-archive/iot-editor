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
			mqttMessage: 'Hello, MQTT',
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
		var mqttMessage = this.state.mqttMessage;

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
							hintText="Message"
							floatingLabelText="Message"
							defaultValue={mqttMessage}
							multiLine={true}/>

						<FlatButton label="确定" secondary={true} onClick={this.handleRequestServer}/>
					</CardActions>
				</Card>

				<Snackbar
					ref="snackbar"
					message={serverMessage}
					action="undo"
					autoHideDuration={this.state.autoHideDuration} />
			</div>
		);
	}


	handleRequestServer(e) {
		var result = ipc.sendSync('mqtt', this.state);
		if(result.connected) {
			this.setState({serverMessage: 'connected successful'});
			this.refs.snackbar.show();
		}

		var that = this;
		ipc.on('synchronous-mqtt', function(arg) {
			console.log(arg);
			that.setState({serverMessage: arg});
			that.refs.snackbar.show();
		});
	}

}

export default HomePage;
