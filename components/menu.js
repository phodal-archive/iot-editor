let React = require('react');
let Router = require('react-router');
let { Styles } = require('material-ui');
let { Colors, Spacing, Typography } = Styles;

import Menu from 'material-ui/lib/menus/menu';
import MenuItem from 'material-ui/lib/menus/menu-item';


class AppMenu extends React.Component {

	constructor() {
		super();
	}

	render() {
		let styles = {
			menu: {
				float: 'left',
				position: 'relative',
				height: '100%',
				zIndex: 0
			}
		};

		return (
			<Menu style={styles.menu}>
				<MenuItem primaryText="Maps" />
				<MenuItem primaryText="Books" />
				<MenuItem primaryText="Flights" />
				<MenuItem primaryText="Apps" />
			</Menu>
		);
	}
}

export default AppMenu;