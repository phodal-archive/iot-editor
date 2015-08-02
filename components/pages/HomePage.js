import React from 'react';
let mui = require('material-ui');
let {
	Avatar,
	Card,
	CardActions,
	CardHeader,
	CardText,
	CardTitle,
	RaisedButton,
	TextField
} = mui;

class HomePage extends React.Component {

	handleServerURLChange (event){
		console.log(event.target.value)
	};

	render() {
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
						defaultValue="mqtt.phodal.com:1883"
						floatingLabelText="MQTT服务器"
						onChange={this.handleServerURLChange}
						/>
					<TextField
						hintText="Topic"
						defaultValue="test"
						floatingLabelText="Topic" />
				</CardActions>

				<CardActions expandable={true}>
					<TextField
						hintText="Hint Text (MultiLine)"
						floatingLabelText="Floating Label Text"
						multiLine={true}/>

					<RaisedButton label="确定" secondary={true} />
				</CardActions>
			</Card>
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
						floatingLabelText="Topic" />
				</CardActions>

				<CardActions expandable={true}>
					<TextField
						hintText="Hint Text (MultiLine)"
						floatingLabelText="Floating Label Text"
						multiLine={true}/>

					<RaisedButton label="确定" secondary={true} />
				</CardActions>
			</Card>
			</div>
		);
	}

}

export default HomePage;
