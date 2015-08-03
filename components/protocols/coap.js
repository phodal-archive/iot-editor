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

class CoAP extends React.Component {
	constructor() {
		super();
		this.state = {
			autoHideDuration: 0,
			coapServer: 'mqtt.phodal.com',
			coapTopic: 'test',
			coapMessage: 'Hello, CoAP',
			serverMessage: ''
		};

		this.handleRequestServer = this.handleRequestServer.bind(this);
		this.handleServerURLChange = this.handleServerURLChange.bind(this);
		this.handleServerTopicChange = this.handleServerTopicChange.bind(this);
		this.handleServerMessageChange = this.handleServerMessageChange.bind(this);
	}

	handleServerURLChange(event) {
		this.setState({coapServer: event.target.value});
	}

	handleServerTopicChange(event) {
		this.setState({coapTopic: event.target.value});
	}

	handleServerMessageChange(event) {
		this.setState({coapMessage: event.target.value});
	}

	render() {
		var coapServer = this.state.coapServer;
		var coapTopic = this.state.coapTopic;
		var serverMessage = this.state.serverMessage;
		var coapMessage = this.state.coapMessage;

		return (
			<div>
				<Card initiallyExpanded={false}>
					<CardHeader
						title="CoAP"
						subtitle="Constrained Application Protocol，受约束的应用协议"
						avatar={<Avatar style={{color:'blue'}}>C</Avatar>}
						showExpandableButton={true}>
					</CardHeader>
					<CardActions expandable={true}>
						<TextField
							hintText="CoAP服务器"
							defaultValue={coapServer}
							floatingLabelText="CoAP服务器"
							onChange={this.handleServerURLChange}
							/>
						<TextField
							hintText="Topic"
							defaultValue={coapTopic}
							onChange={this.handleServerTopicChange}
							floatingLabelText="Topic"/>
					</CardActions>

					<CardActions expandable={true}>
						<TextField
							hintText="Message"
							floatingLabelText="Message"
							defaultValue={coapMessage}
							onChange={this.handleServerMessageChange}
							multiLine={true}/>

						<FlatButton label="确定" secondary={true} onClick={this.handleRequestServer}/>
					</CardActions>
				</Card>

				<Snackbar
					ref="caopsnackbar"
					message={serverMessage}
					action="undo"
					autoHideDuration={this.state.autoHideDuration} />
			</div>
		);
	}


	handleRequestServer() {
		var result = ipc.sendSync('coap', this.state);

		if(result.response) {
			this.setState({serverMessage: result.response});
			this.refs.caopsnackbar.show();
		}
	}

}

export default CoAP;
